import {FIELD_HEIGHT, FIELD_WIDTH} from './consts';
import {appendAndCreateNode} from './utils';


export class Field {
    constructor() {
        const cellsContainer = appendAndCreateNode(document.body, 'cell-rows-container');
        const cellRowContainers = appendAndCreateNode(cellsContainer, 'cells-row', undefined, FIELD_HEIGHT);
        for (let i = 0; i < FIELD_HEIGHT; i++) {
            appendAndCreateNode(cellRowContainers[i], 'cell', undefined, FIELD_WIDTH);
        }
    }

    #handleLineups() {

    }

    checkLineups() {

    }
}