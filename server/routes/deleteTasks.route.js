const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// Deletes the entire task for DOM and database.
taskRouter.delete('/:id', (req, res) => {
	console.log('Great Delete');
	let queryString = `DELETE FROM tasks WHERE "id"=${req.params.id};`;
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
