import {initField} from './Field';
import {move, newTile} from './TileFactory';


console.log('hello');

initField();
newTile();

setInterval(function () {
    move('down');
}, 10000);

const cellRowsContainer = document.querySelector('cell-rows-container');

cellRowsContainer.addEventListener('click', (event) => {
    if (event.target !== cellRowsContainer) return;
    console.log(event.target, 'height:', cellRowsContainer.offsetHeight, 'offsetY:', event.offsetY, 'width:', cellRowsContainer.offsetWidth, 'offsetX:', event.offsetX);
    if (event.offsetY < cellRowsContainer.offsetHeight / 2) {
        move('spin');
    } else {
        if (event.offsetX < cellRowsContainer.offsetWidth / 2) {
            move('left');
        } else {
            move('right');
        }
    }
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown': {
            move('down');
        }
            break;
        case 'ArrowRight': {
            move('right');
        }
            break;
        case 'ArrowLeft': {
            move('left');
        }
            break;
        case ' ':
        case 'ArrowUp': {
            move('spin');
        }
    }
});


