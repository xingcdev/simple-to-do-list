const initiate = function () {
	const dropZone = document.querySelector('.todo-items');
	dropZone.addEventListener('dragstart', onDragStart);

	dropZone.addEventListener('dragover', onDragOver);
	dropZone.addEventListener('drop', onDrop);
};

const onDragStart = function (event) {
	const currentDragEvent = event;

	// Identify the current dragged element by adding a id
	currentDragEvent.dataTransfer.setData(
		'text/plain',
		currentDragEvent.target.getAttribute('data-id')
	);

	const currentDraggedElement = event.target;
	console.log(currentDraggedElement);
	currentDraggedElement.classList.add('isDragging');
};

const onDragOver = function (event) {
	// Assure that we can drop the element on the div.
	event.preventDefault();
};

const onDrop = function (event) {
	// Avoid the page refresh
	event.preventDefault();

	const draggedElementId = event.dataTransfer.getData('text');
	const draggedElement = document.querySelector(
		`[data-id='${draggedElementId}']`
	);

	const dropZone = event.target;
	console.log(event.target);
	dropZone.appendChild(draggedElement);
};

export default initiate;
