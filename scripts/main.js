console.log("this is working")

// Import your classes (Ship, Gameboard, Player) and the dom module here
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js'
import {Player} from './player.js'
import domModule from './dom.js';

const enemyBoard = document.getElementById('enemy-board');
const startButton = document.getElementById('start-button');

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

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startGame(enemyBoard)
})

// Start the game loop
function startGame(enemyBoard) {
  // disable the "Start Game" button to prevent multiple game starts
  domModule.setStartButtonState(false);

  // initialize game variables and states
  let playerTurn = true; //player starts

  let gameOver=false;

  //main game loop
  function gameLoop(){
    if(playerTurn){
        // player's turn
        domModule.displayMessage('Your turn. Click on the enemy board to attack.')

        // define a variable to track if the player has made an attack in this round
        let hasAttacked = false;

        enemyBoard.addEventListener('click', handlePlayerAttack);

        function handlePlayerAttack(event){
            if(hasAttacked){
                // player already attacked in this turn
                return;
            }

            // player's attack logic
            const cell = event.target;
            const x = cell.cellIndex; //get the cell's column index
            const y = cell.parentNode.rowIndex; //get the cell's row index

            //check if the attack is valid
            if(enemyGameboard.isValidAttack(x, y)){
                // Check if the attack hit a ship
                console.log(x, y, enemyGameboard.board[y][x])
                if (enemyGameboard.board[y][x] !== null) {
                    // Hit
                    alert('You hit an enemy ship!');
                    cell.classList.add('hit');
                } else {
                    // Miss
                    alert('You missed!');
                }
                //make an attack on the enemy gameboard
                enemyGameboard.receiveAttack(x, y);

                // render the updated enemy game board
                domModule.renderBoard(enemyGameboard.board, false)

                //check for game over conditions
                if(enemyGameboard.allShipsSunk()){
                    gameOver = true;
                    // display the game result
                    domModule.displayMessage('Congratulations! You win.')
                }

                // toggle player turn
                playerTurn = !playerTurn

                //mark that the player has attacked in this turn
                hasAttacked = true;

                if(!gameOver){
                    // continue the game loop with the next turn (player's turn)
                    setTimeout(gameLoop, 1000) // delay for better UX
                    domModule.displayMessage('Computer turn. Please wait.')
                }
            }
        }
    }else{
        // Computer's turn (AI logic)
        if(!gameOver){
            // implement AI logic to choose the player's board coordinates for the attack
            const x = getRandomCoordinate()
            const y = getRandomCoordinate();

            console.log(x, y)

            if(enemyGameboard.isValidAttack(x, y)){
                // make an attack on the player's game board
                playerGameboard.receiveAttack(x, y)

                // render the updated player game board
                domModule.renderBoard(playerGameboard.board, true);

                // check for game over conditions
                if(playerGameboard.allShipsSunk()){
                    gameOver = true;
                    // display the game result
                    domModule.displayMessage('Computer wins. Try again!')
                }

                // toggle player turn
                playerTurn = !playerTurn

                if(!gameOver){
                    // continue the game loop with the next turn (player's turn)
                    setTimeout(gameLoop, 1000) // delay for better UX
                    domModule.displayMessage('Your turn. Click on the enemy board to attack.')
                }
            }
        }
    }
  }

  // start the game loop
  gameLoop();
}

// function to get a random coordinate within the board's bounds
function getRandomCoordinate(){
    return Math.floor(Math.random() * 10)
}

export { startGame }