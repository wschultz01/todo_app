const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks.route');
const deleteTasks = require('./routes/deleteTasks.route');
const insertTasks = require('./routes/insertTasks.route');
const updateTasks = require('./routes/updateTasks.route');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/tasks', tasks);
app.use('/tasks', deleteTasks);
app.use('/tasks', insertTasks);
app.use('/tasks', updateTasks);

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
