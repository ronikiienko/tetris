import {initTetris, moveTileMain, restartGame, startGame, toggleStart} from './Tetris';


initTetris();

// TODO to stop propagation i currently use pointer events: none. Not sure about it

document.body.addEventListener('click', (event) => {
    console.log(event);
    if (event.pageY < document.body.offsetHeight * 0.2) {
        return toggleStart();
    }
    if (event.pageY < document.body.offsetHeight * 0.5) {
        return moveTileMain('spin');
    }
    if (event.pageX <= document.body.offsetWidth / 3) {
        return moveTileMain('left');
    }
    if (event.pageX >= document.body.offsetWidth / 3 * 2) {
        return moveTileMain('right');
    } else {
        moveTileMain('down');
    }

});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown':
        case 's': {
            moveTileMain('down');
        }
            break;
        case 'ArrowRight':
        case 'd': {
            moveTileMain('right');
        }
            break;
        case 'ArrowLeft':
        case 'a': {
            moveTileMain('left');
        }
            break;
        case ' ': {
            moveTileMain('spin');
            startGame();
        }
            break;
        case 'ArrowUp':
        case 'w': {
            moveTileMain('spin');
        }
            break;
        case 'Escape': {
            toggleStart();
        }
            break;
        case '5': {
            restartGame();
        }
    }
});
//
// window.addEventListener('wheel', (event) => {
//     moveTileMain('spin');
// });


