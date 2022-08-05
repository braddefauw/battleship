class Ship {
    constructor(name, length, hits, isSunk){
        this.name = name;
        this.length = length;
        this.hits = hits;
        this.isSunk = isSunk;
    }

    hit(num) {
        this.hits.push(num);
    }

    getShip(){
        return `${this.name}, ${this.length}, ${this.hits}, ${this.isSunk}`;
    }
}

let carrier = new Ship ('Carrier', 5, [], false);
let battleship = new Ship('Battleship', 4, [], false);
let submarine = new Ship('Submarine', 3, [], false);
let destroyer = new Ship('Destroyer', 3, [], false); 
let patrolBoat = new Ship('Patrol Boat', 2, [], false);

console.log(carrier.getShip());

export default Ship;