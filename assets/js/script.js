const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector("[data-table]");
const winningTextMsg = document.querySelector('[data-victory-msg]');
const winnerMsgElement = document.querySelector('[data-winning-msg]');
const restartBtn = document.querySelector('[data-restart-btn]');
 

let circleTurn = false;

let winnerChoice = [
    // Define all possible winning combinations for the game board.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const toMark = (cell, AddClass) => {
    cell.classList.add(AddClass);
};

const startGame = () => {
    // The "startGame" function defines the hover effect to show the player the "X" or the "circle".
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });

    // add events listeners 
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true});
    });

    circleTurn = false;
    table.classList.remove('circle');
    table.classList.add('x');

    // winnerMsgElement.classList.remove('display-victory');
    winnerMsgElement.classList.remove('display-victory');
    winningTextMsg.innerText = '';
}

const finalStage = (ifDraw) => {
    // Displays the endgame message based on the game result.
    if (ifDraw) {
        winningTextMsg.innerText = 'Draw!'
    } else {
        winningTextMsg.innerText = circleTurn 
        ? 'O Takes the Crown!' 
        : 'X Takes the Crown!';
    }

    winnerMsgElement.classList.add('display-victory');
};

const restartGame = () => {
    // this function clears all 'circle' and 'x' classes from cell elements to reset the game board. It then calls startGame to reinitialize the game.
    cellElements.forEach(cell => {
        cell.classList.remove('circle', 'x');
    });
    startGame();
};

const findWinner = (activePlayer) => {
    // Determines if the active player has won the game.
    return winnerChoice.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(activePlayer);
        });
    });
}


const changeTurns = () => {
    // this function define who player is gonna play
    circleTurn = !circleTurn;

    table.classList.remove('circle')
    table.classList.remove('x')

    if (circleTurn) {
        table.classList.add('circle')
    } else {
        table.classList.add('x')
    }
};

const handleClick = (e) => {
    // Select X or Circle to play
    const cell = e.target;
    const AddClass = circleTurn ? "circle" : "x";

    toMark(cell, AddClass);   

    const winner = findWinner(AddClass);
    // This functions will check all the victories
    if (winner) {
        finalStage(false)
    }

    // Check if there is any tie

    // change the simbol

    changeTurns();
};

startGame();

restartBtn.addEventListener('click', restartGame);