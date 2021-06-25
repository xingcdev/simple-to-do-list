const form = document.querySelector('#form');
// Array used to persist the application state
let todos = [];

/**
 * Add a todo item into the DOM todo list
 * @param {text} text A text of a todo item
 */
const addTodo = function (text) {
	const todo = {
		id: Date.now(),
		text: text,
		isCompleted: false,
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

document.addEventListener('DOMContentLoaded', () => restoreTodos());

const restoreTodos = function () {
	const todosRef = window.localStorage.getItem('todosRef');
	if (todosRef) {
		todos = JSON.parse(todosRef);
		todos.forEach((todo) => {
			renderTodoOnDOM(todo);
		});
	}
};

/**
 * Add or update a todo item on the DOM
 * @param {object} todo A todo item
 */
const renderTodoOnDOM = function (todo) {
	updateLocalStorage();

	if (todo.deleted) {
		document.querySelector(`[data-id='${todo.id}']`).remove();
		return;
	}

	// Add a todo as li item on the DOM
	const list = document.querySelector('.todo-list');
	const newItem = document.createElement('li');
	const isCompleted = todo.isCompleted ? 'isCompleted' : '';
	newItem.setAttribute('class', `todo-item ${isCompleted}`);
	newItem.setAttribute('data-id', todo.id);

	// We need to update the checkbox to be checked or not, otherwise when replacing the existing item with the new one, the checkbox on the DOM will always be empty
	let checkboxInput;
	if (isCompleted) {
		checkboxInput = `<input type="checkbox" class="js-checkbox-input checkbox-input" checked>`;
	} else {
		checkboxInput = `<input type="checkbox" class="js-checkbox-input checkbox-input">`;
	}

	newItem.innerHTML = `
	<label class="todo-text">
		<span class="checkbox__input">
			${checkboxInput}
			<span class="checkbox__control">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
					focusable="false"
				>
					<path
						fill="none"
						stroke="white"
						stroke-width="3"
						d="M1.73 12.91l6.37 6.37L22.79 4.59"
					/>
				</svg>
			</span>
		</span> 
		<span class="label">${todo.text}</span>
	</label>

	<a class="delete-todo js-delete-todo">x</a>`;

	const existingItem = document.querySelector(`[data-id='${todo.id}']`);
	if (existingItem) {
		existingItem.replaceWith(newItem);
	} else {
		list.append(newItem);
	}
};

const updateLocalStorage = function () {
	// Only strings may be stored in the localStorage,
	// so we need to convert our todos array to a JSON string
	window.localStorage.setItem('todosRef', JSON.stringify(todos));
};

const main = function () {
	// Instead of listening for clicks on individual checkbox elements,
	// we are listening for clicks on the entire list container.
	document.querySelector('.todo-list').addEventListener('click', (event) => {
		const clickedElement = event.target;

		if (clickedElement.classList.contains('js-checkbox-input')) {
			// dataset.id == "data-id" attribute on the li element
			// 2x parentElement because we've got a div between li and clickedElement
			const liElement =
				clickedElement.parentElement.parentElement.parentElement;
			const itemId = liElement.dataset.id;
			toggleDone(itemId);
		}

		if (clickedElement.classList.contains('js-delete-todo')) {
			// dataset.id == "data-id" attribute on the li element
			// 2x parentElement because we've got a div between li and clickedElement
			const liElement = clickedElement.parentElement;
			const itemId = liElement.dataset.id;
			deleteTodo(itemId);
		}
	});
};

/**
 * Make a todo item as done or not
 * @param {number} id The id of the todo item that we want to change
 */
const toggleDone = function (id) {
	const findTheTodoById = function (id) {
		return todos.findIndex(function (todo) {
			return todo.id === Number(id);
		});
	};

	const index = findTheTodoById(id);
	const thisTodo = todos[index];
	thisTodo.isCompleted = !thisTodo.isCompleted;

	renderTodoOnDOM(thisTodo);
};

/**
 * Delete a todo item
 * @param {number} id The id of the todo item that we want to delete
 */
const deleteTodo = function (id) {
	const findTheTodoById = function (id) {
		return todos.findIndex(function (todo) {
			return todo.id === Number(id);
		});
	};
	const index = findTheTodoById(id);

	// Create a new object with properties of the current todo item
	// add it a `deleted` property which is set to true
	const currentTodo = todos[index];
	const todoToDelete = {
		...currentTodo,
		deleted: true,
	};

	// Array that contains the todos different of the 'id' param
	todos = todos.filter((todo) => todo.id !== Number(id));

	renderTodoOnDOM(todoToDelete);
};

main();
