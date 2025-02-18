// Referencia de cada "Celda" del HTML sean convertidas a Arrays
const cells = Array.from(document.getElementsByClassName("cells"));

// Declaracion de elementos del HTML 
const againBtn = document.getElementById("againBtn");
const gridDiv = document.getElementById("gridDiv");
const announcer = document.getElementById("announcer");
const winsDiv = document.getElementById("winsDiv");
const losesDiv = document.getElementById("losesDiv");
const drawDiv = document.getElementById("drawDiv");

// Recuperacion de las derrotas, victorias y empates en el LocalStorage.
winsDiv.textContent = localStorage.getItem("winsDiv") || "0";
losesDiv.textContent = localStorage.getItem("losesDiv") || "0";
drawDiv.textContent = localStorage.getItem("drawDiv") || "0";

// Convergencia de datos de texto a numeros con la utilizacion de parseInt con ayuda del Profe Jeanca
let winsNumber = parseInt(winsDiv.textContent);
let losesNumber = parseInt(losesDiv.textContent);
let drawNumber = parseInt(drawDiv.textContent);

// Combinaciones de posibles victorias
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [2, 4, 6], [0, 4, 8]  
];


let cellPlaces = ["", "", "", "", "", "", "", "", ""]; // Representacion del tablero
let currentPlayer = "X"; // Valor de "X" para el jugador que inicie el juego
let running = false; // Inicio del juego en Estado = falso

// Inicio de la ronda con la variable startGame.
startGame();

function startGame(){
    // Evento - Funcionalidad del Tablero
    cells.forEach(cell => cell.addEventListener("click", boardClick));
    // Evento - Btn reiniciar
    againBtn.addEventListener("click", restartGame);
    // Actualizacion del announcer segun que jugador esta jugando
    updateTurnDisplay();
    // Display del announcer oculto y con valor ""
    announcer.textContent = "";
    announcer.style.display = "none";
    // Empieza el juego cambiando el estado a true
    running = true;
}

function boardClick(){
    // Obtencion del index de cada celda clickeada
    const index = cells.indexOf(this);
    // If de verificacion para las celdas ocupadas o cuando la ronda no se ha iniciado
    if(cellPlaces[index] != "" || !running) return;
    // Actualizacion del tablero por cada movimiento
    updateBoard(this, index);
} 

function updateBoard(cell, index){
    // Guardado del movimiento en el array del tablero
    cellPlaces[index] = currentPlayer;
    // Actualizacion de las celdas 
    cell.textContent = currentPlayer;
    // Verificacion si encuentra un ganador
    checkWinner();
    // Si el juego sigue en estado true, cambia de jugador
    if(running) { 
        changePlayer(); 
    }
}

function changePlayer(){
    // Cambio entre "X" y "O"
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateTurnDisplay();
    // Pequeño delay para el movimiento de la maquina "O"
    if (currentPlayer === "O" && running){
        setTimeout(botMove, 300);
   }
}

function botMove(){
    // Filtro para las celdas vacias
    let emptyCells = cells.filter((cell) => cell.textContent === "");
    // Si no obtiene ninguna celda vacia, el bot no realiza ningun movimiento
    if (emptyCells.length === 0) return;
    // Seleciona una celda vacia si encuentra una
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    // Coloca "O" en la celda encontrada
    randomCell.textContent = "O";
    cellPlaces[cells.indexOf(randomCell)] = "O";

    // Validacion si el movimiento del bot es una combinacion ganadora
    checkWinner();

    // Si el juego sigue, cambia de jugador despues de una pausa
    if(running){
        setTimeout(() => {
            currentPlayer = "X";  
            updateTurnDisplay();
        }, 300);
    }
}

function updateTurnDisplay() {
    // Actualizacion del display del announcer dependiendo del turno
    setTimeout(() => {
        if (currentPlayer === "X") {
            gridDiv.innerHTML = `<p class="gridP x-icon">X Turn</p><hr><p class="gridP o-icon" style="opacity: 0.3;">O Turn</p>`;
        } else {
            gridDiv.innerHTML = `<p class="gridP x-icon" style="opacity: 0.3;">X Turn</p><hr><p class="gridP o-icon">O Turn</p>`;
        }
    }, 300);
}

function checkWinner(){
    // itineracion de las win conditions
    for (const item of winConditions) {
        let [pos1, pos2, pos3] = item;

        // Verificacion si las tres posiciones resulta alguna combinacion ganadora
        if (cells[pos1].textContent != "" && 
            cells[pos1].textContent === cells[pos2].textContent && 
            cells[pos1].textContent === cells[pos3].textContent) {

            // If para victorias del jugador "X", actualizacion del announcer y guardado en el LocalStorage
            if (cells[pos1].textContent === "X") {
                announcer.textContent = "X Wins!";
                winsNumber++;
                winsDiv.textContent = winsNumber;
                localStorage.setItem("winsDiv", winsNumber);
                running = false; 
            }
            //If para victorias del jugador "O", actualizacion del announcer y guardado en el LocalStorage
            if (cells[pos1].textContent === "O") {
                announcer.textContent = "O Wins!";
                losesNumber++;
                losesDiv.textContent = losesNumber;
                localStorage.setItem("losesDiv", losesNumber);
                running = false;
            }
            announcer.style.display = "block"; // Bloqueo del announcer una vez alguno gana
            return;
        }
    }

    // If para empates entre los jugadores, actualizacion del announcer y guardado en el LocalStorage
    if (!cellPlaces.includes("")) {
        localStorage.setItem("drawDiv", drawNumber);
        drawNumber++;
        running = false;
        drawDiv.textContent = drawNumber;
        announcer.textContent = "It's a Draw!";
        announcer.style.display = "block";  
        return;
    }
}

function restartGame(){

    currentPlayer = "X"; // Inicio de la ronda con el jugador "X"
    cellPlaces = ["", "", "", "", "", "", "", "", ""]; // Limpieza del tablero
    cells.forEach(cell => cell.textContent = ""); // Limpieza del texto del tablero
    updateTurnDisplay(); // Actualizacion del announcer
    announcer.textContent = ""; // Limpieza del mensaje del announcer
    announcer.style.display = "none"; // Codigo para ocultar al announcer
    running = true; // Reinicio del juego.
}