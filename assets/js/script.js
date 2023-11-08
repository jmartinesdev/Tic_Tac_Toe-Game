const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector("[data-table]")

let circleTurn = false;

const toMark = (cell, AddClass) => {
    cell.classList.add(AddClass);
};

const changeTurns = () => {
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

    // Check all the victories

    // Check if there is any tie

    // change the simbol

    changeTurns();
};

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true});
}