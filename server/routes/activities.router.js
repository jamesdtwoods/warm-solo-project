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
  SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id
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
    ORDER BY activities.date, activities.temperature, activities_id;
  `;
  pool.query(queryText, [req.user.id])
    .then((result) => {
      let theActivities = formatActivities(result.rows)
      res.send(theActivities)
    })
    .catch(err => {
      console.log('ERROR: Get all activity items', err);
      res.sendStatus(500)
    })
});

router.get('/weather/:temperature', (req, res) => {
  const queryText = `
  SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id
    FROM activities
      LEFT JOIN activity_type
        ON activities.activity_type_id = activity_type.id
      LEFT JOIN activities_clothes
        ON activities.id = activities_clothes.activities_id
      LEFT JOIN clothes
        ON activities_clothes.clothes_id = clothes.id
      LEFT JOIN clothing_type
        ON clothes.clothing_type_id = clothing_type.id
    WHERE activities.user_id = $1 AND activities.temperature >= ($2 - 5) AND activities.temperature <= ($2 + 5) 
    ORDER BY activities.date, activities.temperature, activities_id;
  `;
  const queryValues = [
    req.user.id,
    req.params.temperature
  ];
  console.log('temp to use', req.params.temperature);
  console.log('user id', req.user.id);
  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('temp query result', result.rows);
      let theActivities = formatActivities(result.rows)
      res.send(theActivities)
    })
    .catch(err => {
      console.log('ERROR: Get activity items by temperature', err);
      res.sendStatus(500)
    })
});

router.get('/search/:tempRange', (req, res) => {
  const queryText = `
  SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id
    FROM activities
      LEFT JOIN activity_type
        ON activities.activity_type_id = activity_type.id
      LEFT JOIN activities_clothes
        ON activities.id = activities_clothes.activities_id
      LEFT JOIN clothes
        ON activities_clothes.clothes_id = clothes.id
      LEFT JOIN clothing_type
        ON clothes.clothing_type_id = clothing_type.id
    WHERE activities.user_id = $1 AND activities.temperature >= ($2) AND activities.temperature <= ($3) 
    ORDER BY activities.date, activities.temperature, activities_id;
  `;
  const queryValues = [
    req.user.id,
    req.params.tempRange.split('-')[0],
    req.params.tempRange.split('-')[1]
  ];
  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('temp query result', result.rows);
      let theActivities = formatActivities(result.rows)
      res.send(theActivities)
    })
    .catch(err => {
      console.log('ERROR: Get activity items by temperature', err);
      res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO "activities" 
      ("date", "temperature", "weather_conditions", "notes", "user_id", "activity_type_id")
    VALUES 
      ($1, $2, $3, $4, $6, $5)
      RETURNING "id";
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
    .then(result => {
      // ID IS HERE!
      console.log('New Activities Id:', result.rows[0].id);
      console.log('clothes array', req.body.clothesArray)
      const activitesId = result.rows[0].id
      const clothesArray = req.body.clothesArray
      console.log('new query', newActivityClothesQuery(clothesArray, activitesId));
      // Now handle the clothes reference:
      const insertActivitiesClothesQuery = newActivityClothesQuery(clothesArray, activitesId);
      // SECOND QUERY ADDS clothes FOR THAT NEW activity
      pool.query(insertActivitiesClothesQuery)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

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
          "activity_type_id"=$5,
          "updated_date"=CURRENT_TIMESTAMP
        WHERE
          id=$6;
    `;
    const queryValues = [
        req.body.date,
        req.body.temperature,
        req.body.weather_conditions,
        req.body.notes,
        req.body.activity_type_id,
        req.params.id
    ];
    pool.query(queryText, queryValues)
    .then(result => {
      const queryDeleteText = `
      DELETE FROM activities_clothes
        WHERE activities_id=${req.params.id};
    `;
    // second QUERY removes clothes FOR THAT activity
      pool.query(queryDeleteText)
        .then(result => {
          const clothesArray = req.body.clothesArray
          console.log('clothes array', clothesArray);
          console.log('activity id', req.params.id);
          console.log('new query', updateActivitiesClothesQuery(clothesArray, req.params.id));
          const editActivitiesClothesQuery = updateActivitiesClothesQuery(clothesArray, req.params.id);
          // Third QUERY ADDS clothes FOR THAT activity
          pool.query(editActivitiesClothesQuery)
          .then(result => {
            res.sendStatus(201);
          }).catch(err => {
            // catch for third query
            console.log(err);
            res.sendStatus(500)
        })
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})


function formatActivities (all) {
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
        clothesArray: [{
            clothes_id: all[0].clothes_id,
            name: all[0].name,
            clothing_type_id: all[0].clothing_type_id
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
                clothesArray: []
            })
        }
        for (let j=0; j<activitiesArray.length; j++) {
            if(activitiesArray[j].activities_id === all[i].activities_id){
            activitiesArray[j].clothesArray.push({
              clothes_id: all[i].clothes_id,
              name: all[i].name,
              clothing_type_id: all[i].clothing_type_id
            })
          }
        }
    }
  return activitiesArray
  }
}

function newActivityClothesQuery (clothesArray, activities_id) {
  let activitiesClothesQuery = `
  INSERT INTO "activities_clothes" 
  ("activities_id", "clothes_id")
  VALUES
  `
  for (let i=0; i<clothesArray.length; i++) {
    if (i < clothesArray.length-1){
      activitiesClothesQuery+=`
      (${activities_id}, ${clothesArray[i]}),
    `
    } else if (i === clothesArray.length-1) {
      activitiesClothesQuery+=`
      (${activities_id}, ${clothesArray[i]});
      `
    }
  }
  return activitiesClothesQuery;
}

function updateActivitiesClothesQuery (clothesArray, activities_id) {
  let activitiesClothesQuery = `
  INSERT INTO "activities_clothes" 
  ("activities_id", "clothes_id")
  VALUES
  `
  for (let i=0; i<clothesArray.length; i++) {
    if (i < clothesArray.length-1){
      activitiesClothesQuery+=`
      (${activities_id}, ${clothesArray[i].id}),
    `
    } else if (i === clothesArray.length-1) {
      activitiesClothesQuery+=`
      (${activities_id}, ${clothesArray[i].id});
      `
    }
  }
  return activitiesClothesQuery;
}

module.exports = router;
