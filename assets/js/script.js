const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector("[data-table]");
const winningTextMsg = document.querySelector('[data-victory-msg]');
const winnerMsgElement = document.querySelector('[data-winning-msg]');
 

let circleTurn = false;

let winnerChoice = [
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
    for(const cell of cellElements) {
        cell.addEventListener("click", handleClick, {once: true})
    }

    circleTurn = false;

    table.classList.add("x")
}

const finalStage = (ifDraw) => {
    // Displays the endgame message based on the game result.
    if (ifDraw) {
        winnerMsgElement.innerText = 'Draw!'
    } else {
        winningTextMsg.innerText = circleTurn 
        ? 'And the circle takes the crown!' 
        : 'X And the circle takes the crown!';
    }

    winningTextMsg.classList.add('display-victory');
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
        finalStage(true)
    }

    // Check if there is any tie

    // change the simbol

    changeTurns();
};

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true});
}

startGame()