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
    const query = `
      SELECT * FROM "activities"
        ORDER BY "date" ASC;
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
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
        req.body.weather,
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

module.exports = router;
