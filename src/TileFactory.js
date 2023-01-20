import {defaultPositionTetrominoes, FIELD_HEIGHT, FIELD_WIDTH, TILE_MOVE_ACTIONS_MAP} from './consts';
import {handleLineups} from './Field';
import {endGame, openEndgameModal} from './Tetris';
import {getRandomNumberInRange, rotateMatrix} from './utils';


const getRandomTetromino = () => {
    const tetrominoesTypes = Object.keys(defaultPositionTetrominoes);
    const newTetrominoName = tetrominoesTypes[getRandomNumberInRange(0, tetrominoesTypes.length - 1)];
    const newTetromino = defaultPositionTetrominoes[newTetrominoName];
    return {newTetromino, newTetrominoName};
};

let tetromino;
let tetrominoName;
let x;
let y;
let activeCellsCoordinates;

export const newTile = () => {
    const {newTetromino, newTetrominoName} = getRandomTetromino();
    tetromino = newTetromino;
    tetrominoName = newTetrominoName;
    x = Math.floor((FIELD_WIDTH / 2) - (tetromino[0].length / 2));
    y = -4;
    activeCellsCoordinates = [];
};

const getAndCheckCoordsAfterAction = (action) => {
    let xTemp = x;
    let yTemp = y;
    let tetrominoTemp = tetromino;

    switch (action) {
        case TILE_MOVE_ACTIONS_MAP.spin: {
            tetrominoTemp = rotateMatrix(tetrominoTemp);
        }
            break;
        case TILE_MOVE_ACTIONS_MAP.right: {
            xTemp = xTemp + 1;
        }
            break;
        case TILE_MOVE_ACTIONS_MAP.left: {
            xTemp = xTemp - 1;
        }
            break;
        case TILE_MOVE_ACTIONS_MAP.down: {
            yTemp = yTemp + 1;
        }
    }

    const newActiveCellsCoordinates = [];

    for (let tetrominoRow = 0; tetrominoRow < tetrominoTemp.length; tetrominoRow++) {
        const fieldRow = tetrominoRow + yTemp;
        for (let tetrominoColumn = 0; tetrominoColumn < tetrominoTemp.length; tetrominoColumn++) {
            const fieldColumn = tetrominoColumn + xTemp;
            if (tetrominoTemp?.[tetrominoRow]?.[tetrominoColumn]) {
                newActiveCellsCoordinates.push({
                    x: fieldColumn,
                    y: fieldRow,
                });
            }
        }
    }

    const {isCrashing, shouldBeSettled} = checkIfWillCrash(newActiveCellsCoordinates, action);
    if (!isCrashing) {
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
    }

    return {newActiveCellsCoordinates, isCrashing, shouldBeSettled};
};

const checkIfWillCrash = (coordinates, action) => {
    let isCrashing = false;
    let shouldBeSettled = false;

    const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
    for (let newActiveCell of coordinates) {
        console.log('new active cell :)', newActiveCell);
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
};

const removePrevPositionTetrominoFromDom = () => {
    const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
    for (const prevActiveCell of activeCellsCoordinates) {
        const prevActiveCellNode = rowsContainer.children?.[prevActiveCell.y]?.children?.[prevActiveCell.x];
        prevActiveCellNode?.classList?.remove('active-temp', tetrominoName);
    }
};

const updateDomTetrominoPosition = (newActiveCellsCoordinates) => {
    const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
    for (const newActiveCell of newActiveCellsCoordinates) {
        const newActiveCellNode = rowsContainer?.children?.[newActiveCell.y]?.children?.[newActiveCell.x];
        newActiveCellNode?.classList?.add('active-temp', tetrominoName);
    }
};


const settleTile = () => {
    const rowsContainer = document.getElementsByTagName('cell-rows-container')[0];
    for (let newActiveCell of activeCellsCoordinates) {
        const rowContainer = rowsContainer.children[newActiveCell.y];
        if (!rowContainer) {
            return endGame();
            // return restartGame();
        }
        rowContainer.children[newActiveCell.x].className = '';
        rowContainer.children[newActiveCell.x].classList.add('active', tetrominoName);
    }
    handleLineups();
    newTile();
};

/**
 *
 * @param action {'left'|'down'|'right'|'spin'}
 */
export const moveTile = (action) => {
    console.log('tile move');
    if (!tetromino) newTile();
    const {newActiveCellsCoordinates, isCrashing, shouldBeSettled} = getAndCheckCoordsAfterAction(action);
    if (!isCrashing) {
        removePrevPositionTetrominoFromDom();
        updateDomTetrominoPosition(newActiveCellsCoordinates);
        activeCellsCoordinates = newActiveCellsCoordinates;
    }
    if (shouldBeSettled) {
        settleTile(newActiveCellsCoordinates);
    }
};
