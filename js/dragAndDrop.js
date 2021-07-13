import { todos } from './index.js';

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
	dropZone.addEventListener('dragover', allowDrop);
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

export const allowDrop = function (event) {
	// Make the drop target(i.e div) droppable
	event.preventDefault();

	// On recupère l'index de l'element sur lequel on est en train de survoler
	function findIndexOfUnderDragged() {
		const underDraggedEl = event.target;
		const underDraggedId = underDraggedEl.dataset.id;
		if (!underDraggedEl.classList.contains('isDragging')) {
			const todoItem = findTodoItemInArray(todos, underDraggedId);
			underDraggedIndex = todos.indexOf(todoItem);
			console.log(underDraggedIndex);
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
		console.log(draggedIndex);
	}
	findIndexOfDragged();

	// TODO replace the underDragged with Dragged
	// TODO render the todos array

	const draggedElement = document.querySelector(
		`[data-id='${draggedElementId}']`
	);
	// currentTarget is the element to which the event handler has been attached
	const dropZone = event.currentTarget;

	event.dataTransfer.clearData();
};

export default initDropZone;
