const gameboard = document.getElementById("gameboard");
const info = document.getElementById("info");
const startCells = ["", "", "", "", "", "", "", "", ""];
info.textContent = "Circle goes first";
let firstPlayer = "circle";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.addEventListener("click", addGo);
    gameboard.appendChild(cellElement);
  });
}
createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(firstPlayer);
  e.target.appendChild(goDisplay);
  firstPlayer = firstPlayer === "circle" ? "cross" : "circle";
  info.textContent = `It is now ${firstPlayer}'s turn`;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allCells = document.querySelectorAll(".cell");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombos.forEach((combo) => {
    const circleWins = combo.every((cellIndex) =>
      allCells[cellIndex].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.textContent = "Circle wins";
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
    }
  });
  winningCombos.forEach((combo) => {
    const crossWins = combo.every((cellIndex) =>
      allCells[cellIndex].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.textContent = "Cross wins";
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
    }
  });
}
