const Gameboard = require('../scripts/gameboard');

class Player {
  constructor(gameboard) {
    this.gameboard = gameboard;
    this.enemyGameboard = new Gameboard(); // The computer's gameboard
    this.movesHistory = []; // To keep track of moves made by the computer
  }

  // Function to make a random move on the enemy gameboard
  makeRandomMove() {
    const x = this.getRandomCoordinate();
    const y = this.getRandomCoordinate();

    // Check if the move has already been made
    if (this.movesHistory.some(move => move.x === x && move.y === y)) {
      return this.makeRandomMove(); // Try again
    }

    this.movesHistory.push({ x, y });

    // Attack the enemy gameboard
    this.enemyGameboard.receiveAttack(x, y);
  }

  // Helper function to generate a random coordinate
  getRandomCoordinate() {
    return Math.floor(Math.random() * 10);
  }
}

module.exports = Player; // Export the Player class for testing