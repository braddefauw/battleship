const Ship = require('../scripts/ship') //import the Ship class
const Gameboard = require('../scripts/gameboard') // import the Gameboard class
const Player = require('../scripts/player') // import the Player class

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

function gameLoop() {
    const { player, playerGameboard, computerGameboard } = setupGame();
    let currentPlayer = player;
    let currentGameboard = playerGameboard;

    while(true){
        // check if the game is over
        if(currentGameboard.allShipsSunk()){
            console.log(currentPlayer === player ? 'Computer wins!' : 'Player wins!');
            break;
        }

        // make a move for the current player
        if (currentPlayer === player){
            // player's turn
            // implement player's turn logic here, allowing the player to make moves
            // for now, we will manually input player moves
            // example: const playerMove = { x: 1, y: 3}
            // playerGameboard.receiveAttack(playerMove.x, playerMove.y)
        } else {
            // computer's turn
            const computerMove = currentPlayer.makeRandomMove();
            console.log(`Computer attacks: ${computerMove.x}, ${computerMove.y}`)
        }

        // swap the current player and gameboard
        const temp = currentPlayer;
        currentPlayer = currentGameboard;
        currentGameboard = temp;
    }
}

gameLoop();