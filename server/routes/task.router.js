const express = require('express');
const taskRouter = express.Router(); 

//added static files from server 
const pool = require('../modules/pool');

//GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error getting tasks', err);
        res.sendStatus(500);
    })
})


//POST




//PUT




//DELETE



module.exports = taskRouter;