import {Tetris} from './Tetris';


console.log('hello');

const tetris = new Tetris();

const cellRowsContainer = document.querySelector('cell-rows-container');

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
            tetris.moveTile('down');
        }
            break;
        case 'ArrowRight':
        case 'd': {
            tetris.moveTile('right');
        }
            break;
        case 'ArrowLeft':
        case 'a': {
            tetris.moveTile('left');
        }
            break;
        case ' ': {
            tetris.moveTile('spin');
            tetris.start();
        }
            break;
        case 'ArrowUp':
        case 'w': {
            tetris.moveTile('spin');
        }
            break;
        case 'Escape': {
            tetris.toggleStart();
        }
            break;
        case '2': {
            tetris.restart();
        }
    }
});


