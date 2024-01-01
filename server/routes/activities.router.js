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
        console.log('formatted activities:', theActivities);
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


  // [
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 1,
  //     name: 'Swix Hat',
  //     clothing_type: 'Hat'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 2,
  //     name: 'Swix Lobster Gloves',
  //     clothing_type: 'Gloves'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 3,
  //     name: 'Thick Smartwool Socks',
  //     clothing_type: 'Socks'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 4,
  //     name: 'Smartwool baselayer',
  //     clothing_type: 'Base layer - torso'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 6,
  //     name: 'Gortex Bike Jacket',
  //     clothing_type: 'Jacket'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 7,
  //     name: 'Swix Ski Pants',
  //     clothing_type: 'Pants'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 8,
  //     name: 'Clear Bolle Goggles',
  //     clothing_type: 'Accessories'
  //   },
  //   {
  //     activities_id: 1,
  //     date: 2024-01-01T06:00:00.000Z,
  //     temperature: 20,
  //     weather_conditions: 'Cloudy, windy',
  //     notes: 'Biked to school',
  //     activity_type: 'Biking',
  //     clothes_id: 9,
  //     name: 'Green Buff',
  //     clothing_type: 'Other'
  //   },
  //   {
  //     activities_id: 4,
  //     date: 2023-11-29T06:00:00.000Z,
  //     temperature: 43,
  //     weather_conditions: 'rainy',
  //     notes: 'nonn',
  //     activity_type: 'CC Skiing (classic)',
  //     clothes_id: 1,
  //     name: 'Swix Hat',
  //     clothing_type: 'Hat'
  //   },
  //   {
  //     activities_id: 4,
  //     date: 2023-11-29T06:00:00.000Z,
  //     temperature: 43,
  //     weather_conditions: 'rainy',
  //     notes: 'nonn',
  //     activity_type: 'CC Skiing (classic)',
  //     clothes_id: 2,
  //     name: 'Swix Lobster Gloves',
  //     clothing_type: 'Gloves'
  //   },
  //   {
  //     activities_id: 4,
  //     date: 2023-11-29T06:00:00.000Z,
  //     temperature: 43,
  //     weather_conditions: 'rainy',
  //     notes: 'nonn',
  //     activity_type: 'CC Skiing (classic)',
  //     clothes_id: 3,
  //     name: 'Thick Smartwool Socks',
  //     clothing_type: 'Socks'
  //   },
  //   {
  //     activities_id: 4,
  //     date: 2023-11-29T06:00:00.000Z,
  //     temperature: 43,
  //     weather_conditions: 'rainy',
  //     notes: 'nonn',
  //     activity_type: 'CC Skiing (classic)',
  //     clothes_id: 4,
  //     name: 'Smartwool baselayer',
  //     clothing_type: 'Base layer - torso'
  //   },
  //   {
  //     activities_id: 8,
  //     date: 2024-01-25T06:00:00.000Z,
  //     temperature: 55,
  //     weather_conditions: 'sunny',
  //     notes: 'new note',
  //     activity_type: 'Running',
  //     clothes_id: 6,
  //     name: 'Gortex Bike Jacket',
  //     clothing_type: 'Jacket'
  //   },
  //   {
  //     activities_id: 8,
  //     date: 2024-01-25T06:00:00.000Z,
  //     temperature: 55,
  //     weather_conditions: 'sunny',
  //     notes: 'new note',
  //     activity_type: 'Running',
  //     clothes_id: 7,
  //     name: 'Swix Ski Pants',
  //     clothing_type: 'Pants'
  //   },
  //   {
  //     activities_id: 8,
  //     date: 2024-01-25T06:00:00.000Z,
  //     temperature: 55,
  //     weather_conditions: 'sunny',
  //     notes: 'new note',
  //     activity_type: 'Running',
  //     clothes_id: 8,
  //     name: 'Clear Bolle Goggles',
  //     clothing_type: 'Accessories'
  //   },
  //   {
  //     activities_id: 8,
  //     date: 2024-01-25T06:00:00.000Z,
  //     temperature: 55,
  //     weather_conditions: 'sunny',
  //     notes: 'new note',
  //     activity_type: 'Running',
  //     clothes_id: 9,
  //     name: 'Green Buff',
  //     clothing_type: 'Other'
  //   }
  // ]
  
// NEED TO FIGURE THIS OUT BETTER
function format2 (all) {
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
  
  // [{
  //     activities_id: all[0].activities_id,
  //     date: all[0].date,
  //     temperature: all[0].temperature,
  //     weather_conditions: all[0].weather_conditions,
  //     notes: all[0].notes,
  //     activity_type: all[0].activity_type,
  //     clothes:[{
  //         clothes_id: all[0].clothes_id,
  //         name: all[0].name,
  //         clothing_type: all[0].clothing_type
  //     }]
  // }]
  // console.log('activity array before', activitiesArray);
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
          // console.log('activity array at:', i, activitiesArray);
      }
      for (let j=0; j<activitiesArray.length; j++) {
          if(activitiesArray[j].activities_id === all[i-1].activities_id){
          activitiesArray[j].clothes.push({
            clothes_id: all[i].clothes_id,
            name: all[i].name,
            clothing_type: all[i].clothing_type
          })
        }
      //   console.log('activity array with clothes at:', j, activitiesArray);
      }
  }
 return activitiesArray
}

module.exports = router;
