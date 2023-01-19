import {initTetris, moveTile, restartGame, startGame, toggleStart} from './Tetris';


console.log('hello');

initTetris();

// const cellRowsContainer = document.querySelector('cell-rows-container');
// cellRowsContainer.addEventListener('click', (event) => {
//     if (event.target !== cellRowsContainer) return;
//     console.log(event.target, 'height:', cellRowsContainer.offsetHeight, 'offsetY:', event.offsetY, 'width:', cellRowsContainer.offsetWidth, 'offsetX:', event.offsetX);
//     if (event.offsetY < cellRowsContainer.offsetHeight / 2) {
//         moveTile('spin');
//     } else {
//         if (event.offsetX < cellRowsContainer.offsetWidth / 2) {
//             tetris.moveTile('left');
//         } else {
//             tetris.moveTile('right');
//         }
//     }
// });

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


