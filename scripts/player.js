class Player {
    constructor(){
        this.enemyGameboard = null;
    }

    setEnemyGameboard(enemyGameboard){
        this.enemyGameboard = enemyGameboard;
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
        } while(this.enemyGameboard.board[x][y] !== null);

        // attack the enemy gameboard at the randomly chosen coordinates
        this.enemyGameboard.receiveAttack(x, y);

        //return the coordinates of the attack
        return {x, y}
    }
}

module.exports = Player;