import {
	todos,
	currentList,
	renderTodoList,
	generateActiveTodos,
	generateCompletedTodos,
} from './index.js';

let draggedIndex, underDraggedIndex;

/**
 *
 * @param {array} array array of object
 * @param {number} id of the element that we want to find
 * @return {object} element we have found
 */
const findTodoItemInArray = function (array, id) {
	return array.find((element) => element.id === Number(id));
};

const initDropZone = function () {
	const dropZone = document.querySelector('.todo-items');
	dropZone.addEventListener('dragover', onDragOver);
	dropZone.addEventListener('drop', onDrop);
};

export const onDragStart = function (event) {
	const currentDragEvent = event;

	// Identify the current dragged element by adding a id
	currentDragEvent.dataTransfer.setData(
		'text/plain',
		currentDragEvent.target.getAttribute('data-id')
	);

	const currentDraggedElement = event.target;
	currentDraggedElement.classList.add('isDragging');
};

export const onDragEnd = function (event) {
	const currentDraggedElement = event.target;
	currentDraggedElement.classList.remove('isDragging');
};

export const onDragOver = function (event) {
	// Make the drop target(i.e div) droppable
	event.preventDefault();

	// On recupère l'index de l'element sur lequel on est en train de survoler
	function findIndexOfUnderDragged() {
		const underDraggedEl = event.target;
		const underDraggedId = underDraggedEl.dataset.id;
		if (!underDraggedEl.classList.contains('isDragging')) {
			const todoItem = findTodoItemInArray(todos, underDraggedId);
			underDraggedIndex = todos.indexOf(todoItem);
		}
	}
	findIndexOfUnderDragged();
};

export const onDrop = function (event) {
	// Avoid the page refresh
	event.preventDefault();

	function findIndexOfDragged() {
		const draggedElementId = event.dataTransfer.getData('text');
		const todoItem = findTodoItemInArray(todos, draggedElementId);
		// On recupère l'index de l'element isDragging
		draggedIndex = todos.indexOf(todoItem);
	}
	findIndexOfDragged();

	const moveDragged = function () {
		const draggedTodo = todos[draggedIndex];
		removeElementAtIndex(draggedIndex, todos);
		addElementAtIndex(underDraggedIndex, draggedTodo, todos);
	};
	moveDragged();

	const render = function () {
		switch (currentList) {
			case 'completed': {
				const completedTodos = generateCompletedTodos();
				renderTodoList(completedTodos);
				break;
			}
			case 'active': {
				const activeTodos = generateActiveTodos();
				renderTodoList(activeTodos);
				break;
			}
			default: {
				renderTodoList(todos);
				break;
			}
		}
	};
	render();
	event.dataTransfer.clearData();
};

const removeElementAtIndex = function (index, array) {
	array.splice(index, 1);
};

const addElementAtIndex = function (index, elementToAdd, array) {
	array.splice(index, 0, elementToAdd);
};

export default initDropZone;
