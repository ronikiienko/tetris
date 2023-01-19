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


let interval;
let isStarted;

export const initTetris = () => {
    initField();
    startGame();
};

const openPauseModal = () => {
    closeAnyModal();
    document.body.appendChild(document.createElement('modal')).innerHTML = pauseModalHtml;
    document.getElementById('modal-buttons-container').addEventListener('click', event => {
        if (!event.target.classList.contains('modal-button')) return;
        switch (event.target.id) {
            case 'resume-game-button':
                startGame();
                break;
            case 'restart-game-button':
                restartGame();
                break;
            case 'main-menu':
                break;
        }
    });
};

const openEndgameModal = () => {

};

const closeAnyModal = () => {
    const pauseModal = document.getElementsByTagName('modal')[0];
    if (pauseModal) document.body?.removeChild(pauseModal);
};

export const toggleStart = () => {
    if (isStarted) {
        pauseGame();
    } else {
        startGame();
    }
};

export const startGame = () => {
    if (isStarted) return;
    isStarted = true;
    interval = setInterval(function () {
        moveTile('down');
    }, speed);
    closeAnyModal();
};

export const pauseGame = () => {
    if (!isStarted) return;
    isStarted = false;
    clearInterval(interval);
    openPauseModal();
};

export const moveTile = (action) => {
    if (!isStarted) return;
    moveTile(action);
};

export const restartGame = () => {
    console.log('starting game');
    clearField();
    newTile();
    startGame();
    closeAnyModal();
};