const Ship = require("../ship");

describe('Ship', () => {

    let carrier, battleship, submarine, destroyer, patrolBoat;
    
    beforeEach(() => {
        carrier = new Ship ('Carrier', 5, [' ', ' ', ' ', ' ', ' '], false);
        battleship = new Ship('Battleship', 4, [' ', ' ', ' ', ' '], false);
        submarine = new Ship('Submarine', 3, [' ', ' ', ' '], false);
        destroyer = new Ship('Destroyer', 3, [' ', ' ', ' '], false); 
        patrolBoat = new Ship('Patrol Boat', 2, [' ', ' '], false);
    })

    test('creates and initializes a ship', () => {
        expect(destroyer).toEqual({name: 'Destroyer', length: 3, hits: [' ', ' ', ' '], sunk: false})
    })

    test('ship takes a hit', () => {
        destroyer.hit(2);
        expect(destroyer.hits[1]).toEqual("hit");
    })

    test('ship sinks', () => {
        destroyer.hit(2);
        destroyer.hit(1);
        destroyer.hit(3);
        expect(destroyer.isSunk()).toBe(true);
    })

    test('prevents a ship from being hit multiple times', () => {
        destroyer.hit(1);
        destroyer.hit(1);
        destroyer.hit(1);
        expect(destroyer.hits[0]).toEqual("hit");
    }) 
})