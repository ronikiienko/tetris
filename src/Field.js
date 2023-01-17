import {FIELD_HEIGHT, FIELD_WIDTH} from './consts';


export class Field {
    init() {
        const cellsContainer = document.createElement('cell-rows-container');
        const cellsRowContainerGod = document.createElement('cells-row');
        const cellNodeGod = document.createElement('cell');
        for (let i = 0; i < FIELD_HEIGHT; i++) {
            const cellsRowContainer = cellsContainer.appendChild(cellsRowContainerGod.cloneNode());
            for (let j = 0; j < FIELD_WIDTH; j++) {
                const cellNode = cellsRowContainer.appendChild(cellNodeGod.cloneNode());
            }
        }
        document.body.appendChild(cellsContainer);
    }
}