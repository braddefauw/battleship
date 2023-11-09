export class Gameboard {
    constructor() {
        // A 10x10 grid for the game board
        this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
        // intialize all cells to null
        for (let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.board[i][j] = null;
            }
        }

        // initialize an empty array to store the ships placed on the board
        this.ships = [];
        // initialize an empty array to store the coordinates of missed attacks
        this.missedAttacks = [];
    }

    // function to place a ship on the game board at the specified coordinates
    placeShip(ship, x, y, isVertical){
        // check if the ship placement is valid
        if(this.isShipPlacementValid(ship, x, y, isVertical)){
            if(isVertical){
                // plae the ship vertically on the board
                for(let i = 0; i < ship.length; i++){
                    this.board[x + i][y] = ship;
                }
            } else {
                // place the ship horizontally on the board
                for(let i = 0; i < ship.length; i++){
                    this.board[x][y+i] = ship;
                }
            }
            // add the ship to the list of placed ships
            this.ships.push(ship);
            return true; // ship placement successful
        }
        return false; // ship placement failed
    }

    // function to check if the ship placement is valid
    isShipPlacementValid(ship, x, y, isVertical){
        if(x < 0 || x >= 10 || y < 0 || y >= 10){
            return false; // out of bounds
        }

        if(isVertical){
            if(x + ship.length > 10){
                return false; //ship doesn't fit within the board vertically
            }
            for (let i = 0; i < ship.length; i++){
                if(this.board[x + i][y] !== null){
                    return false; //ship overlaps with another ship
                }
            }
        } else {
            if(y + ship.length > 10){
                return false; // ship doesn't fit within the board horizontally
            }
            for(let i = 0; i < ship.length; i++){
                if(this.board[x][y+i] !== null){
                    return false; // ship overlaps with another ship
                }
            }
        }
        return true; // ship placement is valid
    }

    //function to check if an attack is valid (e.g. not attacking the same coordinate twice)
    isValidAttack(x, y){
        if(x < 0 || x > 10 || y < 0 || y > 10){
            return false; // out of bounds
        }
        console.log(x, y)
        return this.board[x][y] === null;
    }

    // function to receive an attack at the specified coordinates
    receiveAttack(x, y){
        if(this.board[x][y] === null){
            // the attack missed, record the coordinates
            this.missedAttacks.push({x,y})
        } else {
            // the attack hit a ship, call the ship's hit() method
            const shipIndex = this.ships.indexOf(this.board[x][y]);
            if(shipIndex !== -1){
                this.ships[shipIndex].hit();
            }
        }
    }

    // function to check if all ships on the board have been sunk
    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk());
    }
}