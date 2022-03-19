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
taskRouter.post('/', (req, res) => {
    let newTask = req.body;

    let queryText = `
    INSERT INTO "tasks" ("task", "description", "date_started", "date_completed") 
    VALUES ($1, $2, $3, $4);
    `
    let values = [newTask.task, newTask.description, newTask.date_started, newTask.date_completed]

    console.log('Adding new task', values);
    pool.query(queryText, values)
        .then(result =>{
            res.sendStatus(201);
        })
        .catch(err =>{
            console.log('Error in adding task', err);
            res.sendStatus(500);
        });
});


//PUT




//DELETE



module.exports = taskRouter;