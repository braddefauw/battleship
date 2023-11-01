const Ship = require('../scripts/ship') //import the Ship class

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