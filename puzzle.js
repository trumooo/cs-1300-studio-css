document.addEventListener('DOMContentLoaded', function () {
    const puzzleContainer = document.getElementById('puzzle-container');
    const targetPositions = document.querySelectorAll('.target-position');
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');

    // Array of image URLs for puzzle pieces
    const puzzlePieceImages = [
        'assets/resume_part_1.png',
        'assets/resume_part_2.png',
        'assets/resume_part_3.png',
        'assets/resume_part_4.png'
    ];

    // Preload images and create puzzle pieces dynamically
    puzzlePieceImages.forEach((imageUrl, index) => {
        preloadImage(imageUrl, function (image) {
            const puzzlePiece = document.createElement('div');
            puzzlePiece.classList.add('puzzle-piece');
            puzzlePiece.style.backgroundImage = `url('${imageUrl}')`;
            puzzlePiece.style.width = image.width + 'px';
            puzzlePiece.style.height = image.height + 'px';
            puzzlePiece.dataset.index = index + 1;
            puzzlePiece.setAttribute('draggable', 'true');
            puzzleContainer.appendChild(puzzlePiece);
        });
    });

    // Preload image function
    function preloadImage(url, callback) {
        const img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = url;
    }

    // Drag-and-drop event functions (unchanged)
    function dragStart() {
        this.classList.add('dragging');
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('hovered');
    }

    function dragLeave() {
        this.classList.remove('hovered');
    }

    function dragDrop() {
        const draggable = document.querySelector('.dragging');
        const targetIndex = Array.from(targetPositions).indexOf(this);

        // Add feedback on successful drop
        if (targetIndex >= 0) {
            this.appendChild(draggable);
            this.classList.remove('hovered');
            draggable.draggable = false;
            checkCompletion(); // Check completion after each drop
        }
    }

    // Function to check if all puzzle pieces are correctly placed
    function checkCompletion() {
        // Compare the dropped pieces array with the correct arrangement
        const isCorrect = droppedPieces.every((piece, index) => Number(piece.dataset.index) === correctArrangement[index]);

        if (isCorrect) {
            // Puzzle completed successfully
            alert('Congratulations! You completed the puzzle.');
        } else {
            // Puzzle pieces not in correct order
            alert('Oops! Puzzle pieces are not in the correct order. Please try again.');
        }
    }
});
