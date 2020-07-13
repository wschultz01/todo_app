const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// Creates a task to display on DOM and inserts into table.
taskRouter.post('/', (req, res) => {
	console.log('in /tasks POST:', req.body);
	let queryString = `INSERT INTO tasks ( "task", "status", "start", "due" ) 
        VALUES ( $1, $2, $3, $4 )`;
	pool
		.query(queryString, [
			req.body.task_name,
			req.body.status,
			req.body.start,
			req.body.due,
		])
		.then((result) => {
			res.sendStatus(201);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

module.exports = taskRouter;
