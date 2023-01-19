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

    handleLineups() {
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        const lineupRowsIndexes = [];
        for (let rowIndex = 0; rowIndex < rowsContainer.children.length; rowIndex++) {
            const rowContainer = rowsContainer.children[rowIndex];
            let isLineup = true;
            for (let columnIndex = 0; columnIndex < rowContainer.children.length; columnIndex++) {
                const cellNode = rowContainer.children[columnIndex];
                if (!cellNode.classList.contains('active')) {
                    isLineup = false;
                }
            }
            isLineup && lineupRowsIndexes.push(rowIndex);
        }
        for (let lineupRowIndex of lineupRowsIndexes) {
            rowsContainer.removeChild(rowsContainer.children[lineupRowIndex]);
            const newCellsRowContainer = appendAndCreateNode(rowsContainer, 'cells-row', undefined, undefined, true);
            appendAndCreateNode(newCellsRowContainer, 'cell', undefined, FIELD_WIDTH);
        }
    }
}