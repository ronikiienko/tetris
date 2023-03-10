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
const endgameModalHtml = `
    <overlay>
        <modal-content>
            <div id="modal-buttons-container">
                <div id="endgame-modal-label">You lose :(</div>
                <div id="endgame-modal-score"></div>
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
    document.body.appendChild(document.createElement('modal')).innerHTML = endgameModalHtml;
    document.getElementById('endgame-modal-score').textContent = `Score: ${document.getElementById('score').textContent}`;
    document.getElementById('modal-buttons-container').addEventListener('click', event => {
        if (!event.target.classList.contains('modal-button')) return;
        switch (event.target.id) {
            case 'restart-game-button':
                restartGame();
                break;
            case 'main-menu':
                break;
        }
    });
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

export const endGame = () => {
    if (!isStarted) return;
    isStarted = false;
    clearInterval(interval);
    openEndgameModal();
};

export const startGame = () => {
    if (isStarted) return;
    isStarted = true;
    interval = setInterval(function () {
        moveTileMain('down');
    }, 1000);
    closeAnyModal();
};

export const pauseGame = () => {
    if (!isStarted) return;
    isStarted = false;
    clearInterval(interval);
    openPauseModal();
};

export const moveTileMain = (action) => {
    // console.log('          ');
    // console.log('          ');
    // console.log('          ');
    // console.log('          ');
    // console.time('moving tile......');

    if (!isStarted) return;
    for (let i = 0; i < 1; i++) {
        moveTile(action);
    }
    // console.timeEnd('moving tile......');
    // console.log('          ');
    // console.log('          ');
    // console.log('          ');
    // console.log('          ');
};

export const restartGame = () => {
    clearField();
    newTile();
    startGame();
    closeAnyModal();
};