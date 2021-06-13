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
});

const renderTodoOnDOM = function (todo) {
	// Add a todo as li item on the DOM
	const list = document.querySelector('.todo-list');

	const node = document.createElement('li');
	const isDone = todo.isDone ? 'isDone' : '';
	node.setAttribute('class', `todo-item ${isDone}`);
	node.setAttribute('data-id', todo.id);

	node.innerHTML = `
	<div class="right">
		<input type="checkbox" id=${todo.id} class="js-checkbox"> 
		<label for=${todo.id}></label> 
		<span class="text">${todo.text}</span> 
	</div>
	<a class="delete-todo js-delete-todo">x</a>`;

	// Append node to the DOM
	list.append(node);
};

// Instead of listening for clicks on individual checkbox elements,
// we are listening for clicks on the entire list container.
document.querySelector('.todo-list').addEventListener('click', (event) => {
	const clickedElement = event.target;

	if (clickedElement.classList.contains('js-checkbox')) {
		// dataset.id == "data-id" attribute on the li element
		// 2x parentElement because we've got a div between li and clickedElement
		const itemId = clickedElement.parentElement.parentElement.dataset.id;
		toggleDone(itemId);
	}
	console.log(todos);
});

const toggleDone = function (id) {
	const findTheTodoById = function (id) {
		return todos.findIndex(function (todo) {
			return todo.id === Number(id);
		});
	};

	const index = findTheTodoById(id);
	const thisTodo = todos[index];
	thisTodo.isDone = !thisTodo.isDone;

	renderTodoOnDOM(thisTodo);
};

// TODO change renderTodoOnDOM function
