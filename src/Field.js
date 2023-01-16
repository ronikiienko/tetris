export class Field {
    init() {
        const cellsContainer = document.createElement('div');
        cellsContainer.classList.add('cells-container');
        const cellNode = document.createElement('div');
        cellNode.classList.add('cell-node');
        document.body.appendChild(cellsContainer);
    }
}