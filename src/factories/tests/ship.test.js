const Ship = require("../ship");

describe('Ship', () => {
    let carrier = new Ship ('Carrier', 5, [' ', ' ', ' ', ' ', ' '], false);
    let battleship = new Ship('Battleship', 4, [' ', ' ', ' ', ' '], false);
    let submarine = new Ship('Submarine', 3, [' ', ' ', ' '], false);
    let destroyer = new Ship('Destroyer', 3, [' ', ' ', ' '], false); 
    let patrolBoat = new Ship('Patrol Boat', 2, [' ', ' '], false);

    test('creates and initializes a ship', () => {
        expect(destroyer).toEqual({name: 'Destroyer', length: 3, hits: [' ', ' ', ' '], sunk: false})
    })

    test('ship takes a hit', () => {
        destroyer.hit(2);
        expect(destroyer.hits[1]).toEqual("hit");
    })

    // destroyer.hit(1);
    // destroyer.hit(3);
    
})