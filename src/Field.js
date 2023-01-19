import {FIELD_HEIGHT, FIELD_WIDTH} from './consts';
import {appendAndCreateNode} from './utils';


export const initField = () => {
    appendAndCreateNode(document.body, 'span', [{
        attributeName: 'id',
        attributeValue: 'score',
    }, {attributeName: 'textContent', attributeValue: '0'}]);
    const cellsContainer = appendAndCreateNode(document.body, 'cell-rows-container');
    const cellRowContainers = appendAndCreateNode(cellsContainer, 'cells-row', undefined, FIELD_HEIGHT);
    for (let i = 0; i < FIELD_HEIGHT; i++) {
        appendAndCreateNode(cellRowContainers[i], 'cell', undefined, FIELD_WIDTH);
    }
};

export const clearField = () => {
    document.getElementById('score').textContent = '0';
    const cellRowsContainer = document.getElementsByTagName('cell-rows-container')[0];
    for (let cellsRow of cellRowsContainer?.children) {
        for (let cell of cellsRow?.children) {
            cell.className = '';
        }
    }
};

export const handleLineups = () => {
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
    const scoreNode = document.getElementById('score');
    scoreNode.textContent = ((Number(scoreNode.textContent) + Math.pow(lineupRowsIndexes.length, 2))).toString();
    for (let lineupRowIndex of lineupRowsIndexes) {
        rowsContainer.removeChild(rowsContainer.children[lineupRowIndex]);
        const newCellsRowContainer = appendAndCreateNode(rowsContainer, 'cells-row', undefined, undefined, true);
        appendAndCreateNode(newCellsRowContainer, 'cell', undefined, FIELD_WIDTH);
    }
};