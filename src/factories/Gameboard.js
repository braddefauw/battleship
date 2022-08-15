// const Ship = require("../Ship");

const dimension = 10;

class Gameboard {
    constructor(){
        this.board = [];
        this.dimension = 10;
        this.setup();
    }

    // setup(){
    //     for(let i = 0; i < 100; i++){
    //         this.board.push(i);
    //     }
    //     console.log(this.board.length);
    //     return this.board;
    // }

    setup() {
        const grid = [];
        for (let i = 0; i < this.dimension; i++) {
            grid[i] = [i];
            for (let j = 0; j < this.dimension; j++) {
                grid[i][j] = [i,j]
            }
        }
        this.board = grid.flat(1);
        return this.board;
    }

}

let gameboard = new Gameboard;
gameboard.setup();
// console.log(gameboard.setup());
console.log(gameboard.board);


//module.exports = Gameboard;