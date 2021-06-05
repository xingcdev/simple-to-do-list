const form = document.querySelector('#form');
const todos = [];

const addTodo = function (text) {
	const todo = {
		id: Date.now(),
		text: text,
		completed: false,
	};
	todos.push(todo);
};

form.addEventListener('submit', (event) => {
	// Prevent page refresh on form submission
	event.preventDefault();
	const input = document.querySelector('#js-todo-input');
	// Remove whitespace from the beginning and end of the string
	const text = input.value.trim();
	if (text) {
		addTodo(text);
		input.value = '';
	}
	console.log(todos);
});

// TODO
const renderTodo = function (todo) {
	// Add a todo as li item on the DOM
};
