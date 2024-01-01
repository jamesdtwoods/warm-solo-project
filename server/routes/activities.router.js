const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/types', (req, res) => {
    const query = `
      SELECT * FROM "activity_type"
        ORDER BY "type" ASC;
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all activity types', err);
        res.sendStatus(500)
      })
  
});

router.get('/', (req, res) => {
    const queryText = `
    SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothing_type.type AS clothing_type
      FROM activities
        LEFT JOIN activity_type
          ON activities.activity_type_id = activity_type.id
        LEFT JOIN activities_clothes
          ON activities.id = activities_clothes.activities_id
        LEFT JOIN clothes
          ON activities_clothes.clothes_id = clothes.id
        LEFT JOIN clothing_type
          ON clothes.clothing_type_id = clothing_type.id
      WHERE activities.user_id = $1
      ORDER BY activities_id;
    `;
    pool.query(queryText, [req.user.id])
      .then((result) => {
        let theActivities = format2(result.rows)
        res.send(theActivities)
      })
      .catch(err => {
        console.log('ERROR: Get all activity items', err);
        res.sendStatus(500)
      })
  
});

router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO "activities" 
      ("date", "temperature", "weather_conditions", "notes", "user_id", "activity_type_id")
    VALUES 
      ($1, $2, $3, $4, $6, $5);
    `;
    const queryValues = [
        req.body.date,
        req.body.temperature,
        req.body.weather_conditions,
        req.body.notes,
        req.body.activity_type_id,
        req.user.id
    ];
    pool.query(queryText, queryValues)
      .then((result) => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error in POST /api/activities', err);
        res.sendStatus(500);
      });
});

router.delete('/:id', (req, res) => {
    const queryText = `
      DELETE FROM activities
      WHERE id=$1;
    `;
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
        console.log('Error in DELETE /api/activities/:id', err);
        res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    const queryText = `
      UPDATE "activities"
        SET 
          "date"=$1, 
          "temperature"=$2, 
          "weather_conditions"=$3,
          "notes"=$4,
          "activity_type_id"=$5
          "updated_date"=CURRENT_TIMESTAMP
        WHERE
          id=$6;
    `;
    const queryValues = [
        req.body.date,
        req.body.temperature,
        req.body.weather,
        req.body.notes,
        req.body.activity_type_id,
        req.params.id
    ];
  
    pool.query(queryText, queryValues)
      .then((result) => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error in PUT /api/activities/:id', err);
        res.sendStatus(500);
      });
});

function format2 (all) {
  if (all[0] === undefined){
    return [];
  } else {
    let activitiesArray = [{
        activities_id: all[0].activities_id,
        date: all[0].date,
        temperature: all[0].temperature,
        weather_conditions: all[0].weather_conditions,
        notes: all[0].notes,
        activity_type: all[0].activity_type,
        activity_type_id: all[0].activity_type_id,
        clothes: [{
            clothes_id: all[0].clothes_id,
            name: all[0].name,
            clothing_type: all[0].clothing_type
        }]
    }]
    for(let i=1; i<all.length; i++) {
        if (all[i].activities_id !== all[i-1].activities_id){
            activitiesArray.push({
                activities_id: all[i].activities_id,
                date: all[i].date,
                temperature: all[i].temperature,
                weather_conditions: all[i].weather_conditions,
                notes: all[i].notes,
                activity_type: all[i].activity_type,
                activity_type_id: all[i].activity_type_id,
                clothes: []
            })
        }
        for (let j=0; j<activitiesArray.length; j++) {
            if(activitiesArray[j].activities_id === all[i].activities_id){
            activitiesArray[j].clothes.push({
              clothes_id: all[i].clothes_id,
              name: all[i].name,
              clothing_type: all[i].clothing_type
            })
          }
        }
    }
  return activitiesArray
  }
}

module.exports = router;
