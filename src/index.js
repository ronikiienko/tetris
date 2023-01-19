import {initTetris, moveTile, restartGame, startGame, toggleStart} from './Tetris';


console.log('hello');

initTetris();

// TODO to stop propagation i currently use pointer events: none. Not sure about it

const cellRowsContainer = document.querySelector('cell-rows-container');
cellRowsContainer.addEventListener('click', (event) => {
    event.bubbles = false;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (event.target !== cellRowsContainer) return;
    console.log(event.target, 'height:', cellRowsContainer.offsetHeight, 'offsetY:', event.offsetY, 'width:', cellRowsContainer.offsetWidth, 'offsetX:', event.offsetX);
    if (event.offsetY < cellRowsContainer.offsetHeight * 0.2) {
        return toggleStart();
    }
    if (event.offsetX <= cellRowsContainer.offsetWidth / 3) {
        return moveTile('left');
    }
    if (event.offsetX >= cellRowsContainer.offsetWidth / 3 * 2) {
        return moveTile('right');
    } else {
        moveTile('spin');
    }

});

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'ArrowDown':
        case 's': {
            moveTile('down');
        }
            break;
        case 'ArrowRight':
        case 'd': {
            moveTile('right');
        }
            break;
        case 'ArrowLeft':
        case 'a': {
            moveTile('left');
        }
            break;
        case ' ': {
            moveTile('spin');
            startGame();
        }
            break;
        case 'ArrowUp':
        case 'w': {
            moveTile('spin');
        }
            break;
        case 'Escape': {
            toggleStart();
        }
            break;
        case '5': {
            restartGame();
        }
    }
});

window.addEventListener('wheel', (event) => {
    moveTile('spin');
});


