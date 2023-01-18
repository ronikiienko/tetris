import {FIELD_WIDTH} from './consts';
import {getRandomNumberInRange, LimitedCounter, rotateMatrix} from './utils';


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

    constructor() {
        this.tetromino = getRandomTetromino();
        this.x = Math.floor((FIELD_WIDTH / 2) - (this.tetromino[0].length / 2));
        this.y = 0;
        this.spinCounter = new LimitedCounter(0, 3);
        this.activeCellsCoordinates = [];
    }

    checkIfWillCrash() {
        const newActiveCellsCoordinates = [];
        let isCrashing = false;

        const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (let tetrominoRow = 0; tetrominoRow < this.tetromino.length; tetrominoRow++) {
            const fieldRow = tetrominoRow + this.y;
            const rowContainer = rowsContainer?.children[fieldRow];
            for (let tetrominoColumn = 0; tetrominoColumn < this.tetromino.length; tetrominoColumn++) {
                const fieldColumn = tetrominoColumn + this.x;
                const cell = rowContainer?.children[fieldColumn];
                if (this.tetromino?.[tetrominoRow]?.[tetrominoColumn]) {
                    cell?.classList.add('active-temp');
                    newActiveCellsCoordinates.push({
                        x: fieldColumn,
                        y: fieldRow,
                    });
                }
            }
        }
        return {newActiveCellsCoordinates, isCrashing};
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

    spin() {
        console.log('prev tetromino:', this.tetromino);
        this.tetromino = rotateMatrix(this.tetromino);
        console.log('new tetromino:', this.tetromino);
        const {isCrashing, newActiveCellsCoordinates} = this.checkIfWillCrash('spin');
        console.log(newActiveCellsCoordinates);
        if (!isCrashing) {
            this.removePrevPositionTetrominoFromDom();
            this.updateDomTetrominoPosition(newActiveCellsCoordinates);
        }
    }

    /**
     *
     * @param direction {'left'|'down'|'right'}
     */
    move(direction) {
        switch (direction) {
            case 'right': {
                this.x = this.x + 1;
            }
                break;
            case 'left': {
                this.x = this.x - 1;
            }
                break;
            case 'down': {
                this.y = this.y + 1;
            }
        }
        const {isCrashing, newActiveCellsCoordinates} = this.checkIfWillCrash();
        if (!isCrashing) {
            this.removePrevPositionTetrominoFromDom();
            this.updateDomTetrominoPosition(newActiveCellsCoordinates);
        }
        this.activeCellsCoordinates = newActiveCellsCoordinates;
    }
}
