import {Field} from './Field';
import {Tile} from './Tile';
import {appendAndCreateNode} from './utils';


console.log('hello');
const field = new Field();
const tile = new Tile();

appendAndCreateNode(document.body, 'button',
    [
        {
            attributeName: 'onclick',
            attributeValue: function () {
                tile.spin();
            },
        },
        {
            attributeName: 'textContent',
            attributeValue: 'spin',
        },
        {
            attributeName: 'style',
            attributeValue: {
                backgroundColor: 'red',
                position: 'absolute',
            },
        },
    ],
);