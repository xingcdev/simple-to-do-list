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
};

export const onDrop = function (event) {
	// Avoid the page refresh
	event.preventDefault();

	const draggedElementId = event.dataTransfer.getData('text');
	const draggedElement = document.querySelector(
		`[data-id='${draggedElementId}']`
	);

	const dropZone = event.currentTarget;
	dropZone.appendChild(draggedElement);

	event.dataTransfer.clearData();
};
