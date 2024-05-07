document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('dragenter', dragEnter);
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('dragleave', dragLeave);
        tile.addEventListener('drop', drop);
        tile.addEventListener('dragend', dragEnd);
    });

    let draggedItem = null; // Keeps track of the currently dragged item

    function dragStart(e) {
        draggedItem = this; // 'this' refers to the tile being dragged
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.setDragImage(new Image(), 0, 0); // Use a transparent image for dragging
        setTimeout(() => this.classList.add('hide'), 0);
    }

    function dragEnter(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            this.classList.add('active');
        }
    }

    function dragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
        const activeElement = document.querySelector('.dragging');
        const currentTile = e.target.closest('.tile');
        if (currentTile && currentTile !== draggedItem) {
            const bounding = currentTile.getBoundingClientRect();
            const offsetX = e.clientX - bounding.left;
            const offsetY = e.clientY - bounding.top;
            if (offsetX > bounding.width / 2) {
                currentTile.after(draggedItem);
            } else {
                currentTile.before(draggedItem);
            }
        }
    }

    function dragLeave(e) {
        this.classList.remove('active');
    }

    function drop(e) {
        e.preventDefault();
        this.classList.remove('active');
        // Insert the logic to handle the drop effect here, possibly reordering elements
    }

    function dragEnd() {
        this.classList.remove('hide'); // Ensures the tile is visible after being dropped
    }
});
