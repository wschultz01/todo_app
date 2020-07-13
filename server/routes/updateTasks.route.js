const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// Update to mark a task 'Complete'
taskRouter.put('/complete/:id', (req, res) => {
	console.log(req.body, req.params.id);
	let queryString = `UPDATE tasks SET "status"='Complete' WHERE "id"=${req.params.id};`;
	pool
		.query(queryString)
		.then((results) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

// Update the database from the client // The EDIT feature
taskRouter.put('/:id', (req, res) => {
	console.log(req.body, req.params.id);
	let queryString = `UPDATE tasks SET "task"='${req.body.task}', "status"='${req.body.status}', "start"='${req.body.start}', "due"='${req.body.due}' WHERE "id"=${req.params.id};`;
	pool
		.query(queryString)
		.then((results) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

module.exports = taskRouter;
