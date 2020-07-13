let tasks = [];
let saveIndex = null;

$(document).ready(onReady);

function onReady() {
	// Materialize CSS Initialization
	$('.collapsible').collapsible();
	$('select').formSelect();
	// Show All Tasks
	getTasks();
	// Capture All Form Data
	insertTask();
	// Event Click Handlers
	$('#viewTasks').on('click', '.delete-btn', deleteTask);
	$('#viewTasks').on('click', '.complete-btn', completeTask);
	$('#viewTasks').on('click', '.edit-btn', editTask);
	$('#save-btn').on('click', saveTask);
	$('#edit-task-form').hide();
}

function getTasks() {
	$.ajax({
		method: 'GET',
		url: '/tasks',
	})
		.then(function (response) {
			// Table Body To Append Tasks
			let el = $('#viewTasks');
			// Empty Table Body
			el.empty();
			// Capturing Tasks in Global Array
			tasks = response;

			for (let i = 0; i < response.length; i++) {
				// Function to Append Task Row Content
				taskAppend(response, el, i);
			}
		})
		.catch(function (error) {
			alert('Bad' + error);
		});
}

function insertTask() {
	// Form Submit Function
	$('#add-task').submit(function (event) {
		// Form Values
		let taskToSend = {
			task_name: $('#task_name').val(),
			status: $('#status').val(),
			start: $('#start').val(),
			due: $('#due').val(),
		};

		$.ajax({
			method: 'POST',
			url: '/tasks',
			data: taskToSend,
		})
			.then(function (response) {
				// Show All Tasks
				getTasks();
			})
			.catch(function (error) {
				alert('Bad' + error);
			});
		$('#add-task')[0].reset();
		event.preventDefault();
	});
}

function deleteTask() {
	$.ajax({
		method: 'DELETE',
		url: '/tasks/' + $(this).data('id'),
	})
		.then(function (response) {
			// Show All Tasks
			getTasks();
		})
		.catch(function (error) {
			alert('Bad Delete' + error);
		});
}

function completeTask() {
	// This Button's Data ID Value
	let completeID = $(this).data('id');
	// Clicking 'Complete Button' Updates Status to 'Complete'
	$.ajax({
		type: 'PUT',
		url: '/tasks/complete/' + completeID,
	})
		.then(function (response) {
			// Show All Tasks
			getTasks();
		})
		.catch(function (err) {
			alert('problem');
		});
}

function editTask() {
	// Block of Code to Show Current Input Values in Edit Bar

	let index = $(this).data('index');
	// Takes the Index From Global Variable 'tasks'
	const editTaskSingle = tasks[index];
	// Sets the Task Value
	$('#task_name_edit').val(editTaskSingle.task);
	// Sets the Start Value
	let startDate = `${editTaskSingle.start}`;
	$('#start_edit').val(startDate);
	// Sets the Due Value
	let dueDate = `${editTaskSingle.due}`;
	$('#due_edit').val(dueDate);
	// The 'saveIndex' variable is Set the Current Index of Row
	let dataBaseIndex = $(this).data('database');
	saveIndex = dataBaseIndex;
	// The 'EDIT' button can toggle (Hide && Show) Edit Bar
	$('#edit-task-form').toggle();
}

function saveTask() {
	// This is a Function to Capture the Form Information of the Edit Bar
	const dataToSend = {
		task: $('#task_name_edit').val(),
		status: $('#status_edit').val(),
		start: $('#start_edit').val(),
		due: $('#due_edit').val(),
	};

	$.ajax({
		type: 'PUT',
		url: '/tasks/' + saveIndex,
		data: dataToSend,
	})
		.then(function (response) {
			// Show All Tasks
			getTasks();
		})
		.catch(function (err) {
			alert('problem');
		});
	// Hides the Edit Bar at Bottom of Page
	$('#edit-task-form').hide();
	$('#edit-task-form')[0].reset();
	event.preventDefault();
}

function taskAppend(response, el, i) {
	// Function to Append HTML Content to DOM // Takes the response, tbody div and i (from for loop).
	el.append(`<tr>${
		// Ternary Statement to Display When a Task is Complete
		response[i].status === 'Not Started' || response[i].status === 'In-Progress'
			? `<td class="task-style-no-line">${response[i].task}</td>`
			: `<td class="task-style-line">${response[i].task}</td>`
	}
		<td>${response[i].status}</td>
		<td>${response[i].start}</td>
		<td>${response[i].due}</td>
		<td>${
			// Ternary Statement to Complete a Task
			response[i].status === 'Not Started' ||
			response[i].status === 'In-Progress'
				? `<button type="button" class="complete-btn btn waves-effect waves-light light-green darken-3" data-id=${response[i].id}>Complete</button>`
				: ''
		}</td>
		<td><button type="button" class="delete-btn complete-btn btn waves-effect waves-light pink darken-3" data-id=${
			response[i].id
		}>Delete</button></td>
		<td><button type='button' class='edit-btn btn waves-effect waves-light blue darken-3' data-database=${
			response[i].id
		} data-index=${i}>Edit</button></td></tr>`);
}
