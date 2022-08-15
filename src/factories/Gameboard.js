const Ship = require("./ship");

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
                grid[i][j] = [i, j, false]
            }
        }
        this.board = grid.flat(1);
        return this.board;
    }

    place(direction, num, ship) {
        //validation
        if (num < 0 || num > 99) {
            console.log("please enter position between 1 and 99");
            return;
        }
        if (direction === "horizontal" && (this.board[num][0] !== this.board[num+ship.length][0])) {
            console.log("cannot place ship");
            return;
        }
        if (direction === "vertical" && (num + ((ship.length-1)*10) > 99)) {
            console.log("cannot place ship");
            return;
        } 
        //console.log(direction);
        //actually place ship
        let location = num;
        //add 3rd item to coordinate array in setup method, false (eg [8, 1, false])????
        for (let i = 0; i < ship.length; i++){
            if (direction === "horizontal") {
                this.board[location][2] = true;
                location++;
            } else {
                this.board[location][2] = true;
                location += 10;
            }  
        }
        return this.board;
    }

}

const destroyer = new Ship('Destroyer', 3, [' ', ' ', ' '], false);
let gameboard = new Gameboard;
//gameboard.place("horizontal", 2, destroyer);
//gameboard.place("horizontal", 9, destroyer);
//gameboard.place("vertical", 2, destroyer);
gameboard.place("vertical", 90, destroyer);
console.log(gameboard.board);


module.exports = Gameboard;