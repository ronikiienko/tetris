import {initTetris, moveTileMain, restartGame, startGame, toggleStart} from './Tetris';


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
        return moveTileMain('left');
    }
    if (event.offsetX >= cellRowsContainer.offsetWidth / 3 * 2) {
        return moveTileMain('right');
    } else {
        moveTileMain('spin');
    }

});

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'ArrowDown':
        case 's': {
            moveTileMain('down');
        }
            break;
        case 'ArrowRight':
        case 'd': {
            moveTileMain('right');
        }
            break;
        case 'ArrowLeft':
        case 'a': {
            moveTileMain('left');
        }
            break;
        case ' ': {
            moveTileMain('spin');
            startGame();
        }
            break;
        case 'ArrowUp':
        case 'w': {
            moveTileMain('spin');
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
    moveTileMain('spin');
});


