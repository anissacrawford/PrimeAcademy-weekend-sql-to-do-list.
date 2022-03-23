const express = require('express');
const taskRouter = express.Router(); 

//added static files from server 
const pool = require('../modules/pool');

//GET ROUTE
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error getting tasks', err);
        res.sendStatus(500);
    })
})

//POST ROUTE
taskRouter.post('/', (req, res) => {
    let newTask = req.body;

    let queryText = `
    INSERT INTO "tasks" ("task", "description", "completed") 
    VALUES ($1, $2, FALSE);
    `
    let values = [newTask.task, newTask.description]

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

//PUT ROUTE
taskRouter.put('/:id', (req,res) => {

    

    let queryText = `UPDATE "tasks"
    SET "completed" = 'TRUE'
    WHERE "id" = $1;
    `;

    const queryParams = [
    req.params.id
    ]

    pool.query(queryText, queryParams)
    .then(result => {
        res.sendStatus(200);
    }).catch(err =>{
        console.log('POOL BROKE', err);
        res.sendStatus(500);
    }) 

})

//DELETE ROUTE
taskRouter.delete('/:id', (req, res) =>{
    console.log('got to delete!', req.params.id);
    let id = req.params.id;
    
    const queryText = 
        `DELETE FROM "tasks"
        WHERE "id" = $1;
        `
    const values = [id];

    pool.query(queryText, values)
    .then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})


module.exports = taskRouter;