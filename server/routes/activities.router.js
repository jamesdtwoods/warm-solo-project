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
  SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.feel, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothes.description, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id
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
    ORDER BY activities.date DESC, activities.temperature, activities_id;
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
    SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.feel, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothes.description, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id    
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
  pool.query(queryText, queryValues)
    .then((result) => {
      let theActivities = formatActivities(result.rows)
      res.send(theActivities)
    })
    .catch(err => {
      console.log('ERROR: Get activity items by temperature', err);
      res.sendStatus(500)
    })
});

router.get('/search/?', (req, res) => {
  const queryText = `
    SELECT activities.id AS activities_id, activities.date, activities.temperature, activities.weather_conditions, activities.feel, activities.notes, activity_type.type AS activity_type, activity_type.id AS activity_type_id, clothes.id AS clothes_id, clothes.name, clothes.description, clothing_type.type AS clothing_type, clothing_type.id AS clothing_type_id    
    FROM activities
      LEFT JOIN activity_type
        ON activities.activity_type_id = activity_type.id
      LEFT JOIN activities_clothes
        ON activities.id = activities_clothes.activities_id
      LEFT JOIN clothes
        ON activities_clothes.clothes_id = clothes.id
      LEFT JOIN clothing_type
        ON clothes.clothing_type_id = clothing_type.id
    WHERE activities.user_id = ($1) AND activities.temperature >= ($2) AND activities.temperature <= ($3) AND activity_type_id = ($4)
    ORDER BY activities.date, activities.temperature, activities_id;
  `;
  const queryValues = [
    req.user.id,
    req.query.min,
    req.query.max,
    req.query.type
  ];
  pool.query(queryText, queryValues)
    .then((result) => {
      let theActivities = formatActivities(result.rows)
      res.send(theActivities)
    })
    .catch(err => {
      console.log('ERROR: Get activity items by search', err);
      res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO "activities" 
      ("date", "temperature", "weather_conditions", "feel", "notes", "user_id", "activity_type_id")
    VALUES 
      ($1, $2, $3, $4, $5, $7, $6)
      RETURNING "id";
    `;
    const queryValues = [
        req.body.date,
        req.body.temperature,
        req.body.weather_conditions,
        req.body.feel,
        req.body.notes,
        req.body.activity_type_id,
        req.user.id
    ];
    pool.query(queryText, queryValues)
    .then(result => {
      const activitesId = result.rows[0].id
      const clothesArray = req.body.clothesArray
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
          "feel"=$4,
          "notes"=$5,
          "activity_type_id"=$6,
          "updated_date"=CURRENT_TIMESTAMP
        WHERE
          id=$7;
    `;
    console.log('req.body:', req.body);
    const queryValues = [
        req.body.activity.date,
        req.body.activity.temperature,
        req.body.activity.weather_conditions,
        req.body.activity.feel,
        req.body.activity.notes,
        req.body.activity.activity_type_id,
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
          
          const clothesArray = req.body.clothesArrayForQuery
          console.log('clothes array', req.body.clothesArrayForQuery);
          console.log('activity id', req.params.id);
          // const formattedClothesArray = formatClothesArray(clothesArray)
          console.log('new query', editActivityClothesQuery(clothesArray, req.params.id));
          const editActivitiesClothesQuery = editActivityClothesQuery(clothesArray, req.params.id);
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
        feel: all[0].feel,
        notes: all[0].notes,
        activity_type: all[0].activity_type,
        activity_type_id: all[0].activity_type_id,
        clothesArray: [{
            clothes_id: all[0].clothes_id,
            name: all[0].name,
            description: all[0].description,
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
                feel: all[i].feel,
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
              description: all[i].description,
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

function editActivityClothesQuery (clothesArray, activities_id) {
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

function formatClothesArray (clothesArray) {
  let formattedArray=[];
  for(let i=0; i<clothesArray.length; i++){
    formattedArray.push(clothesArray[i].clothes_id)
  }
  return formattedArray
}

module.exports = router;
