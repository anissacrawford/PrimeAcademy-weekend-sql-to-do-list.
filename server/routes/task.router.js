const express = require('express');
const taskRouter = express.Router(); 

//added static files from server 
const pool = require('../modules/pool');

module.exports = taskRouter;