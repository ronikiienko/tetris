import {FIELD_HEIGHT, FIELD_WIDTH, TILE_MOVE_ACTIONS_MAP} from './consts';
import {appendAndCreateNode, getRandomNumberInRange, rotateMatrix} from './utils';


const defaultPositionTetrominoes = {
    i: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    j: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    l: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    o: [
        [1, 1],
        [1, 1],
    ],
    s: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    t: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ]
};

const getRandomTetromino = () => {
    const tetrominoesTypes = Object.keys(defaultPositionTetrominoes);
    const tetrominoName = tetrominoesTypes[getRandomNumberInRange(3, 3)];
    const tetromino = defaultPositionTetrominoes[tetrominoName];
    return {tetromino, tetrominoName};
};

export class Tile {

    constructor() {
        this.newTile();
    }

    newTile() {
        const {tetromino, tetrominoName} = getRandomTetromino();
        this.tetromino = tetromino;
        this.tetrominoName = tetrominoName;
        this.x = Math.floor((FIELD_WIDTH / 2) - (this.tetromino[0].length / 2));
        this.y = -4;
        this.activeCellsCoordinates = [];
    }

    getAndCheckCoordsAfterAction(action) {
        let x = this.x;
        let y = this.y;
        let tetromino = this.tetromino;

        switch (action) {
            case TILE_MOVE_ACTIONS_MAP.spin: {
                tetromino = rotateMatrix(tetromino);
            }
                break;
            case TILE_MOVE_ACTIONS_MAP.right: {
                x = x + 1;
            }
                break;
            case TILE_MOVE_ACTIONS_MAP.left: {
                x = x - 1;
            }
                break;
            case TILE_MOVE_ACTIONS_MAP.down: {
                y = y + 1;
            }
        }

        const newActiveCellsCoordinates = [];

        for (let tetrominoRow = 0; tetrominoRow < tetromino.length; tetrominoRow++) {
            const fieldRow = tetrominoRow + y;
            for (let tetrominoColumn = 0; tetrominoColumn < tetromino.length; tetrominoColumn++) {
                const fieldColumn = tetrominoColumn + x;
                if (tetromino?.[tetrominoRow]?.[tetrominoColumn]) {
                    newActiveCellsCoordinates.push({
                        x: fieldColumn,
                        y: fieldRow,
                    });
                }
            }
        }

        const {isCrashing, shouldBeSettled} = this.checkIfWillCrash(newActiveCellsCoordinates, action);
        if (!isCrashing) {
            switch (action) {
                case TILE_MOVE_ACTIONS_MAP.spin: {
                    this.tetromino = rotateMatrix(this.tetromino);
                }
                    break;
                case TILE_MOVE_ACTIONS_MAP.right: {
                    this.x = this.x + 1;
                }
                    break;
                case TILE_MOVE_ACTIONS_MAP.left: {
                    this.x = this.x - 1;
                }
                    break;
                case TILE_MOVE_ACTIONS_MAP.down: {
                    this.y = this.y + 1;
                }
            }
        }

        return {newActiveCellsCoordinates, isCrashing, shouldBeSettled};
    }

    checkIfWillCrash(coordinates, action) {
        let isCrashing = false;
        let shouldBeSettled = false;

        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (let newActiveCell of coordinates) {
            if (newActiveCell.y >= FIELD_HEIGHT && (action === TILE_MOVE_ACTIONS_MAP.down || action === TILE_MOVE_ACTIONS_MAP.spin)) {
                isCrashing = true;
                if (action === TILE_MOVE_ACTIONS_MAP.down) {
                    shouldBeSettled = true;
                }
            }
            if (
                (newActiveCell.x < 0 || newActiveCell.x >= FIELD_WIDTH) &&
                (action === TILE_MOVE_ACTIONS_MAP.left || action === TILE_MOVE_ACTIONS_MAP.right || action === TILE_MOVE_ACTIONS_MAP.spin)
            ) {
                isCrashing = true;
            }
            if (rowsContainer.children?.[newActiveCell.y]?.children?.[newActiveCell.x]?.classList.contains('active')) {
                isCrashing = true;
                if (action === TILE_MOVE_ACTIONS_MAP.down) {
                    shouldBeSettled = true;
                }
            }
        }
        return {isCrashing, shouldBeSettled};
    }

    removePrevPositionTetrominoFromDom() {
        console.log('removing....', this.activeCellsCoordinates);
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (const prevActiveCell of this.activeCellsCoordinates) {
            const prevActiveCellNode = rowsContainer.children?.[prevActiveCell.y]?.children?.[prevActiveCell.x];
            prevActiveCellNode?.classList?.remove('active-temp', this.tetrominoName);
        }
    }

    updateDomTetrominoPosition(newActiveCellsCoordinates) {
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (const newActiveCell of newActiveCellsCoordinates) {
            const newActiveCellNode = rowsContainer.children?.[newActiveCell.y]?.children?.[newActiveCell.x];
            newActiveCellNode?.classList?.add('active-temp', this.tetrominoName);
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

    settleTile() {
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (let newActiveCell of this.activeCellsCoordinates) {
            rowsContainer.children[newActiveCell.y].children[newActiveCell.x].className = '';
            rowsContainer.children[newActiveCell.y].children[newActiveCell.x].classList.add('active', this.tetrominoName);
        }
        this.handleLineups();
        this.newTile();
    }

    /**
     *
     * @param action {'left'|'down'|'right'|'spin'}
     */
    move(action) {
        const {newActiveCellsCoordinates, isCrashing, shouldBeSettled} = this.getAndCheckCoordsAfterAction(action);
        console.log(newActiveCellsCoordinates, isCrashing, shouldBeSettled);
        if (!isCrashing) {
            this.removePrevPositionTetrominoFromDom();
            this.updateDomTetrominoPosition(newActiveCellsCoordinates);
            this.activeCellsCoordinates = newActiveCellsCoordinates;
        }
        if (shouldBeSettled) {
            this.settleTile(newActiveCellsCoordinates);
        }
    }
}
