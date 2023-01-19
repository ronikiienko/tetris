import {speed} from './consts';
import {clearField, initField} from './Field';
import {moveTile, newTile} from './TileFactory';
import {appendAndCreateNode} from './utils';


const pauseModalHtml = `
    <div class="overlay">
        <
    </div>
`;

export class Tetris {
    constructor() {
        initField();
    }

    #openPauseModal() {
        appendAndCreateNode(document.body);
    }

    toggleStart() {
        if (this.isStarted) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        if (this.isStarted) return;
        this.isStarted = true;
        this.interval = setInterval(function () {
            moveTile('down');
        }, speed);
    }

    pause() {
        if (!this.isStarted) return;
        this.isStarted = false;
        clearInterval(this.interval);
    }

    moveTile(action) {
        if (!this.isStarted) return;
        moveTile(action);
    }

    restart() {
        clearField();
        newTile();
    }
}