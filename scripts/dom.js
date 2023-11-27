import { startGame } from "./main.js";

// DOM module for handling UI interactions
const domModule = (function () {
    // Cache DOM elements
    const playerBoard = document.getElementById('player-board');
    const enemyBoard = document.getElementById('enemy-board');
    const messageDisplay = document.getElementById('message');
    const startButton = document.getElementById('start-button');
  
    // Render the game board for a given player
    function renderBoard(board, isPlayer) {
      const boardElement = isPlayer ? playerBoard : enemyBoard;
      boardElement.innerHTML = ''; // Clear the board
  
      for (let row = 0; row < 10; row++) {
        const rowElement = document.createElement('tr'); // Create a table row
    
        for (let col = 0; col < 10; col++) {
          const cell = document.createElement('td'); // Create a table data cell
          cell.className = 'cell';
    
          if (board[row][col] !== null) {
            if( isPlayer || isPlayer == false && board[row][col].isSunk() === false){
              cell.classList.add('ship');
            }
            if (board[row][col].isSunk()) {
              cell.classList.add('sunk');
            } else if (board[row][col].isHit()) {
              cell.classList.add('test');
            }
          } else {
            cell.classList.add('miss');
          }
    
          rowElement.appendChild(cell);
        }
    
        boardElement.appendChild(rowElement);
      }
    }
  
    // Display a message on the UI
    function displayMessage(message) {
      messageDisplay.textContent = message;
    }
  
    // Enable or disable the Start Game button
    function setStartButtonState(enabled) {
      startButton.disabled = !enabled;
    }
  
    return {
      renderBoard,
      displayMessage,
      setStartButtonState,
    };
})();

export default domModule;
  