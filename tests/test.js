const Ship = require('../scripts/ship') //import the Ship class
const Gameboard = require('../scripts/gameboard') // import the Gameboard class

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
})