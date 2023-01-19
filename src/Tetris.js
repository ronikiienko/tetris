import {speed} from './consts';
import {clearField, initField} from './Field';
import {moveTile, newTile} from './TileFactory';


const pauseModalHtml = `
    <overlay>
        <modal-content>
            <div id="modal-buttons-container">
                <button id="resume-game-button" class="modal-button">Resume</button>
                <button id="restart-game-button" class="modal-button">Restart</button>
                <button id="main-menu" class="modal-button">Main menu</button>
            </div>
        </modal-content>
    </overlay>
`;

export class Tetris {
    constructor() {
        initField();
        this.#openPauseModal();
    }

    #openPauseModal() {
        console.log('hello');
        document.body.appendChild(document.createElement('modal')).innerHTML = pauseModalHtml;
        document.getElementById('modal-buttons-container').addEventListener('click', event => {
            if (!event.target.classList.contains('modal-button')) return;
            switch (event.target.id) {
                case 'resume-game-button':
                    this.start();
                    this.#closePauseModal();
                    break;
                case 'restart-game-button':
                    this.restart();
                    this.#closePauseModal();
                    break;
                case 'main-menu':
                    break;
            }
        });
    }

    #closePauseModal() {
        document.body.removeChild(document.getElementsByTagName('modal')[0]);
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
        this.#closePauseModal();
    }

    pause() {
        if (!this.isStarted) return;
        this.isStarted = false;
        clearInterval(this.interval);
        this.#openPauseModal();
    }

    moveTile(action) {
        if (!this.isStarted) return;
        moveTile(action);
    }

    restart() {
        clearField();
        newTile();
        this.start();
    }
}