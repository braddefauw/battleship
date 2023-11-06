console.log("test")

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

// Start the game loop
function startGame() {
  // Implement your game loop logic here
  // For example, alternating player turns and handling attacks
}

// Initialize the game
domModule.setStartButtonState(true);
domModule.displayMessage('Click "Start Game" to begin.');