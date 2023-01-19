export const FIELD_WIDTH = 10;
export const FIELD_HEIGHT = 20;

export const TILE_MOVE_ACTIONS_MAP = {
    spin: 'spin',
    down: 'down',
    left: 'left',
    right: 'right',
};

export const defaultPositionTetrominoes = {
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

export const speed = 200;