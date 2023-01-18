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
        if (createdNodeAttributes.length) {
            for (const attribute of createdNodeAttributes) {
                if (attribute.attributeName === 'style') {
                    for (let styleProperty of Object.keys(attribute.attributeValue)) {
                        console.log(styleProperty);
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