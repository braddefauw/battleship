class Ship {
    constructor(name, length, hits, sunk){
        this.name = name;
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit(num) {
        this.hits[num-1] = "hit";
        return this.hits
    }

    isSunk() {
        if(this.hits.every(element => element === "hit")) {
            this.sunk = true;
        }
        return this.sunk;
      }

    getShip(){
        return `${this.name}, ${this.length}, ${this.hits}, ${this.sunk}`;
    }
}

// let carrier = new Ship ('Carrier', 5, [' ', ' ', ' ', ' ', ' '], false);
// let battleship = new Ship('Battleship', 4, [' ', ' ', ' ', ' '], false);
// let submarine = new Ship('Submarine', 3, [' ', ' ', ' '], false);
// let destroyer = new Ship('Destroyer', 3, [' ', ' ', ' '], false); 
// let patrolBoat = new Ship('Patrol Boat', 2, [' ', ' '], false);

// console.log(destroyer.getShip());
// destroyer.hit(2);
// destroyer.hit(1);
// destroyer.hit(3);
// console.log(destroyer.isSunk());
// console.log(destroyer.getShip());

module.exports = Ship;