import {Field} from './Field';
import {Tile} from './Tile';


console.log('hello');
const field = new Field();
const tile = new Tile(() => {
    console.log('settled');
});

setInterval(function () {
    tile.move('down');
}, 1000);

const cellRowsContainer = document.querySelector('cell-rows-container');

cellRowsContainer.addEventListener('click', (event) => {
    if (event.target !== cellRowsContainer) return;
    console.log(event.target, 'height:', cellRowsContainer.offsetHeight, 'offsetY:', event.offsetY, 'width:', cellRowsContainer.offsetWidth, 'offsetX:', event.offsetX);
    if (event.offsetY < cellRowsContainer.offsetHeight / 2) {
        tile.move('spin');
    } else {
        if (event.offsetX < cellRowsContainer.offsetWidth / 2) {
            tile.move('left');
        } else {
            tile.move('right');
        }
    }
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown': {
            tile.move('down');
        }
            break;
        case 'ArrowRight': {
            tile.move('right');
        }
            break;
        case 'ArrowLeft': {
            tile.move('left');
        }
            break;
        case ' ':
        case 'ArrowUp': {
            tile.move('spin');
        }
    }
});


