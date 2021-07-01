// Array used to persist the application state
let todos = [];

/**
 * Add a todo item into the DOM todo list
 * @param {string} text A text of a todo item
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

/**
 * Make a todo item as done or not
 * @param {number} id The id of the todo item that we want to change
 */
const toggleCompleted = function (id) {
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
 * Delete all completed todos
 */
const clearCompleted = function () {
	if (!todos) return;

	todos.forEach((todo) => {
		if (todo.isCompleted) {
			deleteTodo(todo.id);
			console.log('cleared');
		}
	});
};

/**
 * Add or update a todo item on the DOM
 * @param {object} todo A todo item
 */
const renderTodoOnDOM = function (todo) {
	updateLocalStorage();

	if (todo.deleted) {
		document.querySelector(`[data-id='${todo.id}']`).remove();
		updateCounter();
		return;
	}

	// Add a todo as li item on the DOM
	const list = document.querySelector('.todo-list .todo-items');
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
			<span class="checkbox__checkIcon">
				<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
					<path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
				</svg>
			</span>
		</span> 
		<span class="label">${todo.text}</span>
	</label>
	<svg class="delete-todo js-delete-todo" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;

	const existingItem = document.querySelector(`[data-id='${todo.id}']`);
	if (existingItem) {
		existingItem.replaceWith(newItem);
	} else {
		list.append(newItem);
	}

	updateCounter();
};

const renderTodosOnDOM = function (todos) {
	if (todos.length === 0) {
		// Update the counter to 0
		updateCounter();
		return;
	}

	todos.forEach((todo) => renderTodoOnDOM(todo));
};

const updateLocalStorage = function () {
	// Only strings may be stored in the localStorage,
	// so we need to convert our todos array to a JSON string
	window.localStorage.setItem('todosRef', JSON.stringify(todos));
};

/**
 * Display the number of todo items on DOM
 */
const updateCounter = function () {
	const count = document.querySelectorAll('.todo-item').length;
	document.querySelector('.count').innerHTML = count;
};

/**
 * Clear all todo items on the DOM
 */
const clearTodoList = function () {
	document
		.querySelectorAll('.todo-item')
		.forEach((todoItem) => todoItem.remove());
};

const todoFilters = function () {
	// desktop filters and mobile filters
	document.querySelectorAll('.todo-filters').forEach((todoFilter) =>
		todoFilter.addEventListener('click', (event) => {
			const clickedElement = event.target;

			if (clickedElement.classList.contains('filter-button')) {
				document.querySelectorAll('.filter-button').forEach((filterButton) => {
					filterButton.classList.remove('active');
				});

				/**
				 * Make the desktop and the mobile filter buttons as active
				 */
				function MakeFilterButtonsAsActive() {
					// filterClassName = js-filter-all" or "js-filter-active" or js-filter-completed"
					const filterClassName = clickedElement.classList[0];
					document
						.querySelectorAll(`.${filterClassName}`)
						.forEach((filterButton) => filterButton.classList.add('active'));
				}
				MakeFilterButtonsAsActive();
			}

			if (clickedElement.classList.contains('js-filter-completed')) {
				const completedTodos = todos.filter(
					(todo) => todo.isCompleted === true
				);
				clearTodoList();
				renderTodosOnDOM(completedTodos);
			}

			if (clickedElement.classList.contains('js-filter-active')) {
				const activeTodos = todos.filter((todo) => todo.isCompleted !== true);
				clearTodoList();
				renderTodosOnDOM(activeTodos);
			}

			if (clickedElement.classList.contains('js-filter-all')) {
				// We clear the list because some todos will change the order.
				clearTodoList();
				renderTodosOnDOM(todos);
			}
		})
	);
};

const main = function () {
	document.querySelector('#form').addEventListener('submit', (event) => {
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
			toggleCompleted(itemId);
		}

		if (clickedElement.classList.contains('js-delete-todo')) {
			// dataset.id == "data-id" attribute on the li element
			// 2x parentElement because we've got a div between li and clickedElement
			const liElement = clickedElement.parentElement;
			const itemId = liElement.dataset.id;
			deleteTodo(itemId);
		}

		if (clickedElement.classList.contains('js-clear-completed')) {
			clearCompleted();
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

		// TODO Si il y a la classe active sur le bouton
		// afficher tous les élements de todos
	};

	todoFilters();
};

main();
