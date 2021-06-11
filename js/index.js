const form = document.querySelector('#form');
const todos = [];

const addTodo = function (text) {
	const todo = {
		id: Date.now(),
		text: text,
		isDone: false,
	};
	todos.push(todo);
	renderTodoOnDOM(todo);
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
const renderTodoOnDOM = function (todo) {
	// Add a todo as li item on the DOM
	const list = document.querySelector('.todo-list');

	const node = document.createElement('li');
	const isDone = todo.isDone ? 'isDone' : '';
	node.setAttribute('class', `todo-item ${isDone}`);
	node.setAttribute('data-id', todo.id);

	node.innerHTML = `
	<div class="right">
		<input type="checkbox" id=${todo.id}> 
		<label for=${todo.id}></label> 
		<span class="text">${todo.text}</span> 
	</div>
	<a class="delete-todo js-delete-todo">x</a>`;

	// Append node to the DOM
	list.append(node);
};
