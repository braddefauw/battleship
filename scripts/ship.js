export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isHit(){
        return this.hits > 0;
    }

    isSunk() {
        return this.hits === this.length;
    }
}