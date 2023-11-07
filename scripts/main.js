console.log("this is working")

// Import your classes (Ship, Gameboard, Player) and the dom module here
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js'
import {Player} from './player.js'
import domModule from './dom.js';

// Create your game objects
const playerGameboard = new Gameboard();
const enemyGameboard = new Gameboard();
const player = new Player();
player.setEnemyGameboard(enemyGameboard);

// Place your ships on the game boards
const playerShip1 = new Ship(3);
playerGameboard.placeShip(playerShip1, 0, 0, true);
// Place more ships as needed

const enemyShip1 = new Ship(4);
enemyGameboard.placeShip(enemyShip1, 2, 3, false);
// Place more ships for the enemy as needed

// Initialize the game board rendering
domModule.renderBoard(playerGameboard.board, true);
domModule.renderBoard(enemyGameboard.board, false);

// start the game when the "Start Game" button is clicked
domModule.setStartButtonState(true);
domModule.displayMessage(`Click "Start Game" to begin.`)

// Start the game loop
function startGame() {
  // disable the "Start Game" button to prevent multiple game starts
  domModule.setStartButtonState(false);

  // initialize game variables and states
  let playerTurn = true; //player starts

  //main game loop
  function gameLoop(){
    if(playerTurn){
        // player's turn
        domModule.displayMessage("Your turn. Click on the enemy board to attack.")
        // Add a click event listener to the enemy game board
        enemyBoard.addEventListener("click", handlePlayerAttack)
        function handlePlayerAttack(event){
            console.log("clicking board");
            // calculate the cell coordinates based on the click event
            const cell = event.target;
            const x = cell.cellIndex; //get the cell's column index
            const y = cell.parentElement.rowIndex; //get the cell's row index

            // check if the attack is valid (e.g., not attacking the same cell again)
            if(isValidAttack(x, y,)){
                //make an attack on the enemy gameboard
                enemyGameboard.receiveAttack(x, y);

                //render the updated enemy game board
                domModule.renderBoard(enemyGameboard.board, false);

                //check for game over conditions
                if(isGameOver()){
                    //display the game result
                    // enable the start game button to restart
                } else {
                    // toggle player turn
                    playerTurn = !playerTurn;

                    // remove the click event listener to prevent further player moves
                    enemyGameboard.removeEventListener("click", handlePlayerAttack);

                    //continue the game loop with the next turn (computer's turn)
                    setTimeout(gameLoop, 1000); //delay for better UX
                }
            }
        }
    }else{
        // Computer's turn
        domModule.displayMessage(`Computer's turn...`);
        // Implement computer's AI to make a move on the player's board
        // Update the playerGameboard based on the computer's actions
        // Check for game over conditions
        // Toggle playerTurn
    }

    //check for game over conditions and end the game if necessary
    if(isGameOver()){
        // display the game result
        // enable the start game button to restart
    }else{
        //continue the game lopo with the next turn
        setTimeout(gameLoop, 1000); // delay for better UX
    }
  }

  // start the game loop
  gameLoop();
}

// add an event listener to the "start game" button
domModule.setStartButtonState(true);
document.getElementById("start-button").addEventListener("click", () => {
    startGame();
})

// function to check if the game is over
function isGameOver(){
    return enemyGameboard.allShipsSunk() || playerGameboard.allShipsSunk();
}