const defaultPositionTiles = {
    i: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    j: [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 1],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
        ],
    ],
    l: [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    o: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    ],
    s: [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    t: [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    z: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
        ],
    ],
};

const offsetArray = (array, offset) => {
    const offsetArray = [];
    for (let i = 0; i < array.length; i++) {
        if (i >= offset) {
            offsetArray[i] = array[i - offset];
        } else {
            offsetArray[i] = array[array.length + i - offset];
        }
    }
    return offsetArray;
};

const spinArray = (array) => {

};

export class Tile {
    setTile() {
        let tile = defaultPositionTiles.zFlipped;
        // console.log('tile!', tile);
        const cellRowsContainer = document.getElementsByTagName('cell-rows-container')[0];
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                console.log(cellRowsContainer.children[rowIndex].children[columnIndex]);
                if (tile[rowIndex][columnIndex]) {
                    const cellNode = cellRowsContainer.children[rowIndex].children[columnIndex];
                    cellNode.classList.add('active');
                }
            }
        }
        let tile2 = defaultPositionTiles.z;
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                console.log(cellRowsContainer.children[rowIndex].children[columnIndex]);
                if (tile2[rowIndex][columnIndex]) {
                    const cellNode = cellRowsContainer.children[rowIndex].children[columnIndex + 4];
                    cellNode.classList.add('active');
                }
            }
        }
    }
}
