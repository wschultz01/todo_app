const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// GET to display all of the tasks on the page.
taskRouter.get('/', (req, res) => {
	let queryString = `SELECT * FROM tasks ORDER BY "id" ASC`;
	pool
		.query(queryString)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((err) => {
			res.send(500);
		});
});

module.exports = taskRouter;
