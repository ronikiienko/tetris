import {Field} from './Field';
import {Tile} from './Tile';


console.log('hello');
const field = new Field();
const tile = new Tile();

document.querySelector('button#spin').onclick = function () {
    tile.spin();
};

document.querySelector('button#move-left').onclick = function () {
    tile.move('left');
};

document.querySelector('button#move-down').onclick = function () {
    tile.move('down');
};

document.querySelector('button#move-right').onclick = function () {
    tile.move('right');
};


