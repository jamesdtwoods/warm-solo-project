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
    SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.notes, activity_type.type AS activity_type, clothes.id AS clothes_id, clothes.name, clothing_type.type AS clothing_type
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
        let theActivities = formatActivityObject(result.rows)
        console.log('formatted activities:', theActivities);
        res.send([theActivities])
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


//   [
//    {
//     activities_id: 1,
//     date: 2024-01-01T06:00:00.000Z,
//     temperature: 20,
//     weather_conditions: 'Cloudy, windy',
//     notes: 'Biked to school',
//     activity_type: 'Biking',
//     clothes_id: 9,
//     name: 'Green Buff',
//     clothing_type: 'Other'
//   }
//   ]
// NEED TO FIGURE THIS OUT BETTER
  function formatActivityObject(activityRows) {
    console.log('in formatting function', activityRows);
    let activity = {}
  
    activity.activities_id = activityRows[0].activities_id
    activity.date = activityRows[0].date
    activity.temperature = activityRows[0].temperature
    activity.weather_conditions = activityRows[0].weather_conditions
    activity.notes = activityRows[0].notes
    activity.activity_type = activityRows[0].activity_type
    activity.clothes = []
  
    for (let row of activityRows) {
      activity.clothes.push({
        clothes_id: row.clothes_id,
        name: row.name,
        clothing_type: row.clothing_type
      })
    }
  
    return activity
  }

module.exports = router;
