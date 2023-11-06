console.log("this is working");

import { Ship } from '../scripts/ship'
import { Gameboard } from '../scripts/gameboard'
import { Player } from '../scripts/player'

const readline = require('readline')

const playerBoardElement = document.getElementById('player-board');
const enemyBoardElement = document.getElementById('enemy-board');
const messageAreaElement = document.getElementById('message-area')

// create game boards and set up ships
const { player, playerGameboard, computerGameboard } = setupGame();

// render the game boards
renderGameboard(playerGameboard, playerBoardElement, true);
renderGameboard(computerGameboard, enemyBoardElement, false);

function renderGameboard(gameboard, boardElement, isPlayerBoard){
    boardElement.innerHTML = '';
    for(let row = 0; row < 10; row++){
        for(let col = 0; col < 10; col++){
            const cell = document.createElement('div');
            cell.className = 'cell';

            if(!isPlayerBoard){
                // add a click event handler for the enemy game board
                cell.addEventListener('click', () => handleAttack(row, col));
            }

            // customize the display based on the gameboard state
            if(gameboard.board[row][col] !== null){
                cell.style.backgroundColor = 'gray'; //represent ships on the board
            }

            boardElement.appendChild(cell);
        }
    }
}

function handleAttack(row, col){
    //handle the player's attack on the enemy game board
    playerGameboard.receiveAttack(row, col);
    renderGameboard(playerGameboard, playerBoardElement, true);

    // check if game is over
    if(playerGameboard.allShipsSunk()){
        showMessage('Computer Wins!');
        return;
    }

    // computer's turn
    const computerMove = player.makeRandomMove();
    computerGameboard.receiveAttack(computerMove.x, computerMove.y);
    renderGameboard(computerGameboard, enemyBoardElement, false);

    // check if game is over
    if(computerGameboard.allShipsSunk()){
        showMessage('Player wins!')
    }
}

function showMessage(message){
    messageAreaElement.textContent = message;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// initialize the game and set up the game loop
function setupGame(){
    const playerGameboard = new Gameboard();
    const computerGameboard = new Gameboard();

    //populate game boards with predetermined coordinates
    const playerShip1 = new Ship(3);
    const playerShip2 = new Ship(4);
    const computerShip1 = new Ship(2);
    const computerShip2 = new Ship(3);

    playerGameboard.placeShip(playerShip1, 0, 0, true);
    playerGameboard.placeShip(playerShip2, 2, 2, false);
    computerGameboard.placeShip(computerShip1, 4, 3, true);
    computerGameboard.placeShip(computerShip2, 6, 7, false);

    const player = new Player();
    player.setEnemyGameboard(computerGameboard);

    return { player, playerGameboard, computerGameboard }
}

async function playerTurn(player, playerGameboard){
    console.log(`Player, it's your turn.`);

    const playerMove = await promptForMove();

    playerGameboard.receiveAttack(playerMove.x, playerMove.y)
}

function promptForMove(){
    return new Promise((resolve) => {
        rl.question(`Enter your attack coordiantes: (e.g., x y):`, input => {
            const [x, y] = input.split(' '.map(Number));
            resolve({x, y})
        })
    })
}

function gameLoop() {
    const { player, playerGameboard, computerGameboard } = setupGame();
    let currentPlayer = player;
    let currentGameboard = playerGameboard;

    console.log('Battleship Game - Player vs. Computer');

    while(true){
        // check if the game is over
        if(currentGameboard.allShipsSunk()){
            console.log(currentPlayer === player ? 'Computer wins!' : 'Player wins!');
            break;
        }

        // make a move for the current player
        if (currentPlayer === player){
            // player's turn
            playerTurn(player, playerGameboard);
        } else {
            // computer's turn
            const computerMove = currentPlayer.makeRandomMove();
            console.log(`Computer attacks: ${computerMove.x}, ${computerMove.y}`)
        }

        currentPlayer = currentPlayer === player ? (currentGameboard = computerGameboard, player) : (currentGameboard = playerGameboard, player);
    }

    rl.close()
}

gameLoop();