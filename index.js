
const cells = Array.from(document.getElementsByClassName("cells"));
const againBtn = document.getElementById("againBtn")
const gridDiv = document.getElementById("gridDiv")

const winConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [2, 4, 6],[0, 4, 8]
];

let cellPlaces = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let running = false

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", boardClick));
    againBtn.addEventListener("click", restartGame);
    updateTurnDisplay();
    running = true;

}

function boardClick(){
    const index = this.id;

    if(cellPlaces[index] !="" || !running){
        return;
    }
    updateBoard(this, index);
    checkWinner();
}

function updateBoard(cell, index){
    cellPlaces[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    changePlayer();
}

function changePlayer(){
   currentPlayer = (currentPlayer === "X") ? "O" : "X";
   updateTurnDisplay();

   if (currentPlayer === "O" && running){
        setTimeout(botMove, 500);
   }

}

function botMove(){
    let emptyCells = cells.filter((cell, index) => cellPlaces[index] === "");
    if (emptyCells.length === 0 || !running) return;
    let randomCell = emptyCells[Math.floor(Math.random()* emptyCells.length)];
    let index = randomCell.id;

    updateBoard(randomCell, index);
    checkWinner();
}

function updateTurnDisplay() {
    // Change the gridDiv text to show whose turn it is
    if (currentPlayer === "X") {
        gridDiv.innerHTML = `<p class="gridP x-icon">X Turn</p><hr><p class="gridP o-icon" style="opacity: 0.3;">O Turn</p>`;
    } else {
        gridDiv.innerHTML = `<p class="gridP x-icon" style="opacity: 0.3;">X Turn</p><hr><p class="gridP o-icon">O Turn</p>`;
    }
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition= winConditions[i];
        const cellA = cellPlaces[condition[0]];
        const cellB = cellPlaces[condition[1]];
        const cellC = cellPlaces[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        running = false;
    }else if(!cellPlaces.includes("")){
       running = false;
    }
}

function restartGame(){
    currentPlayer = "X";
    cellPlaces = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    updateTurnDisplay();
    running = true;
    if (runninf === true) {
        alert("X won")
    }else{
        alert("You lose")
    }


}


