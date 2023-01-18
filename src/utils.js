export class LimitedCounter {
    constructor(min, max, initialCount = 0) {
        this.count = initialCount;
        this.min = min;
        this.max = max;
    }

    increment() {
        if (this.count < this.max) {
            this.count = this.count + 1;
        } else {
            this.count = this.min;
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count = this.count - 1;
        } else {
            this.count = this.max;
        }
    }
}

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

export const getRandomNumberInRange = (min, max) => {
    const minMaxDifference = max - min + 1;
    let number = Math.random() * minMaxDifference + min;
    number = Math.floor(number);
    number = Number(number);
    return number;
};


/**
 * This function creates node by selected tag and set your attributes on it
 * @param whereToAppend {HTMLElement}
 * @param createdNodeTag {string}
 * @param createdNodeAttributes {Array.<{attributeName: string, attributeValue: *}>}
 * @param numberToAppend {number}
 * @return {undefined|Array.<HTMLElement>|HTMLElement}
 */
export const appendAndCreateNode = (whereToAppend, createdNodeTag, createdNodeAttributes = [], numberToAppend = 1) => {
    try {
        const nodeToAppend = document.createElement(createdNodeTag);
        if (createdNodeAttributes?.length) {
            for (const attribute of createdNodeAttributes) {
                if (attribute.attributeName === 'style') {
                    for (let styleProperty of Object.keys(attribute.attributeValue)) {
                        nodeToAppend[attribute.attributeName][styleProperty] = attribute.attributeValue[styleProperty];
                    }
                } else {
                    // TODO probably should make a copy instead of just setting
                    nodeToAppend[attribute.attributeName] = attribute.attributeValue;
                }
            }
        }
        let appendedNodes = [];
        for (let i = 0; i < numberToAppend; i++) {
            if (numberToAppend === 1) {
                appendedNodes = whereToAppend.appendChild(nodeToAppend);
            } else {
                const appendedNode = whereToAppend.appendChild(nodeToAppend.cloneNode());
                appendedNodes.push(appendedNode);
            }
        }
        return appendedNodes;
    } catch (e) {
        return undefined;
    }
};

export const rotateMatrix = (matrix) => {
    const numberOfRows = matrix.length;
    const numberOfColumns = matrix[0].length;
    const tempArr = [];
    const grid = [];

    for (let row = 0; row < numberOfRows; row++) {
        tempArr[row] = Array(numberOfColumns);
        grid[row] = Array(numberOfColumns);
    }

    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < numberOfColumns; column++) {
            tempArr[row][column] = matrix[column][row];
        }

    }

    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < Math.ceil(numberOfColumns / 2); column++) {
            const tempArrVal = tempArr[row][column];
            grid[row][column] = tempArr[row][numberOfColumns - column - 1];
            grid[row][numberOfColumns - column - 1] = tempArrVal;
        }
    }

    return grid;
};

// const matrix = [
//     [0, 1, 0],
//     [1, 1, 1],
//     [0, 0, 0],
// ];
// const matrix = [
//     [1, 2, 3, 4, 'a'],
//     [5, 6, 7, 8, 'b'],
//     [9, 10, 11, 12, 'c'],
//     [13, 14, 15, 16, 'd'],
//     [13, 14, 15, 16, 'd'],
// ];
// console.log('matrix:', matrix, 'rotated matrix:', rotateMatrix(matrix));