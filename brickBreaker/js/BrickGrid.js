class BrickGrid{
    constructor(brickArray){
        this.level = 1;
        this.rows = 6;
        this.columns = 10;
        this.bricks=[];
        this.brickArray=brickArray;
        this.onlybricks =[];
        this.init();
    }
    init(){
        for (let i=0; i<this.rows; i++){
            this.bricks[i]=[];
            for (let j=0; j<this.columns; j++){
                this.bricks[i][j]=null;
            }
        }

        this.brickArray.forEach(
            (mybrick)=>{
                var row = parseInt(mybrick[0] / 10) ;
                var column = mybrick[0] % 10;
                var brik = new Brick(column*80, row*30, mybrick[1] || 1, this.getPower(mybrick[2]))
                this.bricks[row][column]=brik;
                this.onlybricks.push(brik);
            }
        )
        log(this.bricks);
    }

    getPower(code){
        switch(code){
            case 'm': return new Magnet();
            case 'su': return new SpeedUp();
            case 'sd': return new SpeedDown();
            case 'bx': return new BallMultiplier();
            case 'sx': return new ScoreMultiplier();
            case 'ex': return new Expand();
            case 'sh': return new Shrink();
            case 'b': return new Bullet();
            case 'f': return new FireBallPower();
            case 'c': return new ChakraBallPower();
            default: return null;
        }
    }
    
}

