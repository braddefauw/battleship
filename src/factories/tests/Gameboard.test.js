const Gameboard = require("../Gameboard");

describe('Gameboard', () => {
    let gameboard;
    
    beforeEach(() => {
        gameboard = new Gameboard();
    })

    test('creates and initializes gameboard', () => {
        expect(gameboard.board.length).toEqual(100);
    })
})