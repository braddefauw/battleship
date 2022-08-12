class Ship {
    constructor(name, length, hits, sunk){
        this.name = name;
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit(num) {
        if(this.hits[num-1] === " "){
            this.hits[num-1] = "hit";
        }
        return this.hits;
    }

    isSunk() {
        if(this.hits.every(element => element === "hit")) {
            this.sunk = true;
        }
        return this.sunk;
    }
}

module.exports = Ship;