// const Ship = require("../Ship");

const dimension = 10;

class Gameboard {
    constructor(){
        this.board = [];
        this.dimension = 10;
        this.setup();
    }

    setup(){
        for(let i = 0; i < 100; i++){
            this.board.push(i);
        }
        console.log(this.board.length);
        return this.board;
    }
}

module.exports = Gameboard;