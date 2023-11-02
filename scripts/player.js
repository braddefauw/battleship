class Player {
    constructor(){
        this.enemyGameboard = null; // initialize the enemy game board
    }

    setEnemyGameboard(enemyGameboard){
        this.enemyGameboard = enemyGameboard; // set the enemy gameboard to attack
    }

    makeRandomMove(){
        if(!this.enemyGameboard){
            throw new Error("Enemy gameboard not set.")
        }

        let x, y;
        do{
            // generate random coordinates for the move
            x = Math.floor(Math.random()*10);
            y = Math.floor(Math.random()*10);
        } while(this.enemyGameboard.board[x][y] !== null); // ensure the move hasn't been made before

        // attack the enemy gameboard at the randomly chosen coordinates
        this.enemyGameboard.receiveAttack(x, y);

        //return the coordinates of the attack
        return {x, y}
    }
}

module.exports = Player; //export the player class for testing