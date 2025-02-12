
const cells = document.getElementsByClassName("cells")
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
    running = true;

}

function boardClick(){
    const cells = this.getAttribute("cells");

    if(options[cells] !="" || !running){
        return;

    }
    updateBoard(this, cells);
    checkWinner();
}

function updateBoard(cell, index){
    options[index] = currentPlayer;
    cell.textContect = currentPlayer;


}

function changePlayer(){


}

function checkWinner(){


}

function restartGame(){


}


