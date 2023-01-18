import {FIELD_HEIGHT, FIELD_WIDTH, TILE_MOVE_ACTIONS_MAP} from './consts';
import {getRandomNumberInRange, rotateMatrix} from './utils';


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
    ],
};

const getRandomTetromino = () => {
    const tetrominoesTypes = Object.keys(defaultPositionTetrominoes);
    return defaultPositionTetrominoes[tetrominoesTypes[getRandomNumberInRange(0, 6)]];
};

export class Tile {

    constructor(onSettle) {
        this.onSettle = onSettle;
        this.newTile();
    }

    newTile() {
        this.tetromino = getRandomTetromino();
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
        // for (let tetrominoRow = 0; tetrominoRow < this.tetromino.length; tetrominoRow++) {
        //     const fieldRow = tetrominoRow + this.y;
        //     const rowContainer = rowsContainer?.children[fieldRow];
        //     for (let tetrominoColumn = 0; tetrominoColumn < this.tetromino.length; tetrominoColumn++) {
        //         const fieldColumn = tetrominoColumn + this.x;
        //         const cell = rowContainer?.children[fieldColumn];
        //     }
        // }
        for (let newActiveCell of coordinates) {
            if (newActiveCell.y >= FIELD_HEIGHT && (action === TILE_MOVE_ACTIONS_MAP.down)) {
                isCrashing = true;
                shouldBeSettled = true;
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
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (const rowContainer of rowsContainer.children) {
            for (const cell of rowContainer.children) {
                cell?.classList.remove('active-temp');
            }
        }
        // for (const prevActiveCell of this.activeCellsCoordinates) {
        //     const prevActiveCellNode = rowsContainer.children?.[prevActiveCell.y]?.children?.[prevActiveCell.x]
        //     console.log(prevActiveCellNode, 'prev active!! (removing)', prevActiveCellNode?.classList?.contains('active-temp'), this.activeCellsCoordinates);
        //     prevActiveCellNode?.classList?.remove('active-temp');
        // }
    }

    updateDomTetrominoPosition(newActiveCellsCoordinates) {
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (const newActiveCell of newActiveCellsCoordinates) {
            const newActiveCellNode = rowsContainer.children?.[newActiveCell.y]?.children?.[newActiveCell.x];
            newActiveCellNode?.classList?.add('active-temp');
        }
    }

    settleTile() {
        console.log('settling tile');
        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (let newActiveCell of this.activeCellsCoordinates) {
            console.log(newActiveCell);
            rowsContainer.children[newActiveCell.y].children[newActiveCell.x].className = '';
            rowsContainer.children[newActiveCell.y].children[newActiveCell.x].classList.add('active');
        }
        this.newTile();
    }

    /**
     *
     * @param action {'left'|'down'|'right'|'spin'}
     */
    move(action) {
        const {newActiveCellsCoordinates, isCrashing, shouldBeSettled} = this.getAndCheckCoordsAfterAction(action);
        // console.log(newActiveCellsCoordinates, isCrashing);
        if (!isCrashing) {
            this.removePrevPositionTetrominoFromDom();
            this.updateDomTetrominoPosition(newActiveCellsCoordinates);
        }
        if (shouldBeSettled) {
            this.onSettle();
            this.settleTile(newActiveCellsCoordinates);
        }
        this.activeCellsCoordinates = newActiveCellsCoordinates;
    }
}
