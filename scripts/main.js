const readline = require('readline')

const Ship = require('../scripts/ship') //import the Ship class
const Gameboard = require('../scripts/gameboard') // import the Gameboard class
const Player = require('../scripts/player') // import the Player class

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