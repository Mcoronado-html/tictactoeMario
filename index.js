const cells = Array.from(document.getElementsByClassName("cells"));
const againBtn = document.getElementById("againBtn")
const gridDiv = document.getElementById("gridDiv")
const announcer = document.getElementById("announcer")
const winsDiv = document.getElementById("winsDiv")
const losesDiv = document.getElementById("losesDiv")
const drawDiv = document.getElementById("drawDiv")

winsDiv.textContent = localStorage.getItem("winsDiv") || "0"
losesDiv.textContent = localStorage.getItem("losesDiv") || "0"
drawDiv.textContent = localStorage.getItem("drawDiv") || "0"

let winsNumber = parseInt(winsDiv.textContent);
let losesNumber = parseInt(losesDiv.textContent);
let drawNumber = parseInt(drawDiv.textContent);


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
    announcer.textContent = "";
    announcer.style.display = "none";
    running = true;
}
function boardClick(){
    const index = cells.indexOf(this);
    if(cellPlaces[index] !="" || !running) return;
    updateBoard(this, index);
}
function updateBoard(cell, index){
    cellPlaces[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();

    if(running){changePlayer();
    }

}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateTurnDisplay();
    if (currentPlayer === "O" && running){
        setTimeout(botMove, 300);
   }
}
function botMove(){
    let emptyCells = cells.filter((cell) => cell.textContent === "");
    if (emptyCells.length === 0) return;
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    randomCell.textContent = "O"
    cellPlaces[cells.indexOf(randomCell)] = "O";

    checkWinner();

    if(running){
    setTimeout(() => {
          currentPlayer = "X"  
          updateTurnDisplay()
    }, 300);
    }

}
function updateTurnDisplay() {
    setTimeout(() => {
        if (currentPlayer === "X") {
            gridDiv.innerHTML = `<p class="gridP x-icon">X Turn</p><hr><p class="gridP o-icon" style="opacity: 0.3;">O Turn</p>`;
        } else {
            gridDiv.innerHTML = `<p class="gridP x-icon" style="opacity: 0.3;">X Turn</p><hr><p class="gridP o-icon">O Turn</p>`;
        }
    }, 300);
}
function checkWinner(){
    console.log(drawNumber);
    for (const item of winConditions) {
        let [pos1,pos2,pos3] = item

        if (cells[pos1].textContent != "" && 
            cells[pos1].textContent === cells[pos2].textContent && 
            cells[pos1].textContent === cells[pos3].textContent) {

                if(cells[pos1].textContent === "X"){
                announcer.textContent = "X Wins!"
                winsNumber++;
                winsDiv.textContent = winsNumber;
                localStorage.setItem("winsDiv", winsNumber);  
                running = false; 
                }
                if(cells[pos1].textContent === "O"){
                announcer.textContent = "O Wins!"
                losesNumber++;
                losesDiv.textContent = losesNumber;
                localStorage.setItem("losesDiv", losesNumber);
                running = false; 

                }
            announcer.style.display = "block";
            return;
        }
        if (!cellPlaces.includes("")) {
            localStorage.setItem("drawDiv", drawNumber)
            drawNumber++
            running = false;
            drawDiv.textContent = drawNumber;
            announcer.textContent = "It's a Draw!";
            announcer.style.display = "block";  
            return
        }
        }
    }


function restartGame(){
    currentPlayer = "X";
    cellPlaces = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    updateTurnDisplay();
    announcer.textContent = "";
    announcer.style.display = "none"
    running = true;
}

