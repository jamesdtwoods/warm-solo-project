const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/types', (req, res) => {
    const query = `
      SELECT * FROM "clothing_type"
        ORDER BY "type" ASC;
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all clothing types', err);
        res.sendStatus(500)
      })
  
});

router.get('/', (req, res) => {
    const query = `
      SELECT * FROM "clothes"
        ORDER BY "name" ASC;
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all clothing items', err);
        res.sendStatus(500)
      })
  
});

router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO "clothes" 
	("name", "description", "user_id", "clothing_type_id")
	VALUES 
	($1, $2, $4, $3);
    `;
    const queryValues = [
        req.body.item,
        req.body.description,
        req.body.clothing_type_id,
        req.user.id
    ];
    pool.query(queryText, queryValues)
      .then((result) => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error in POST /api/clothes', err);
        res.sendStatus(500);
      });
  });

  router.delete('/:id', (req, res) => {
    const queryText = `
      DELETE FROM "clothes" 
        WHERE id=$1
    `;
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error in DELETE /api/clothes/:id', err);
        res.sendStatus(500);
      });
  });

module.exports = router;
