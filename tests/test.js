const Ship = require('../scripts/ship') //import the Ship class
const Gameboard = require('../scripts/gameboard') // import the Gameboard class
const Player = require('../scripts/player') // import the Player class

describe('Ship', () => {
    it('should create a ship with the given length and 0 hits', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0)
    })

    it('should increase the hits when hit() is called', () => {
        const ship = new Ship(4);
        ship.hit();
        expect(ship.hits).toBe(1);
        ship.hit();
        expect(ship.hits).toBe(2);
    })

    it('should correctly determine if a ship is sunk', () => {
        const ship = new Ship(2);
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard;
    })

    it('should place a ship on the board', () => {
        const ship = new Ship(3);
        expect(gameboard.placeShip(ship, 0, 0, true)).toBe(true);
    })

    it('should reject an invalid ship placement', () => {
        const ship1 = new Ship(4);
        const ship2 = new Ship(3);

        expect(gameboard.placeShip(ship1, 7, 7, false)).toBe(false); //out of bounds
        expect(gameboard.placeShip(ship2, 5, 5, true)).toBe(true); // valid placement
        expect(gameboard.placeShip(ship1, 5, 5, true)).toBe(false); //overlapping ships
    });

    it('should register a missed attack', () => {
        gameboard.receiveAttack(2, 2);
        expect(gameboard.missedAttacks).toContainEqual({x: 2, y: 2});
    });

    it('should hit a ship on the board', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship, 0, 0, true);
        gameboard.receiveAttack(0, 0);
        expect(ship.hits).toBe(1)
    })

    it('should report whether all ships have been sunk', () => {
        const ship1 = new Ship(3);
        const ship2  = new Ship(2);
        gameboard.placeShip(ship1, 0, 0, true);
        gameboard.placeShip(ship2, 1, 1, false);

        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(1, 2);

        expect(gameboard.allShipsSunk()).toBe(true);
    })
})

describe('Player', () => {
    let player;
    let enemyGameboard;

    beforeEach(() => {
        // create a new player and an enemy gameboard for each test
        player = new Player();
        enemyGameboard = new Gameboard();
        player.setEnemyGameboard(enemyGameboard);
    });
    
    /* The randomness of the makeRandomMove function makes it difficult 
    to predict the exact coordinates it will return, and that's expected because
    it's designed to generate random, non-repeating moves. It's common for tests of 
    random or probabilistic behavior to pass sometimes and 
    fail sometimes due to their inherent nature. */
    it('should make a random legal move', () => {
        // call makeRandomMove to get a random attack coordinate
        const move = player.makeRandomMove();
        const x = move.x;
        const y = move.y;

        // ensure that the attack coordiantes are within valid range (0-9)
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);

        // attack the enemy gameboard at the randomly chosen coordinates
        enemyGameboard.receiveAttack(x, y);

        // try to make the same move again to confirm that it's different
        const move2 = player.makeRandomMove();
        expect(move2.x).not.toBe(x);
        expect(move2.y).not.toBe(y)
    });
});