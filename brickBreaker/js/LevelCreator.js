class LevelCreator{
    constructor(){
        this.bricks=[];
        this.width =67;
        this.height = 23;
        this.damage = 1;
        this.selectedPowerIndex =  -1; 
        this.out = true;
        this.x=-0;
        this.y=0;
        this.powers=[
            new Magnet(),new SpeedUp(),new SpeedDown(),new BallMultiplier(),
            new ScoreMultiplier(),new Expand(),new Shrink(),new BulletPower(),
            new FireBallPower(),new ChakraBallPower()
        ]
        this.brickNumberArray=[];
        this.brickArray = []
        this.level = 1;
    }
    prepare(level){
        this.level = level;
        this.brickArray = currentLevel.customBricks[level];
        this.bricks =[];
        this.brickNumberArray =[]
        this.brickArray.forEach(
            (mybrick)=>{
                if(mybrick[1]){
                var row = parseInt(mybrick[0] / 10) ;
                var column = mybrick[0] % 10;
                var brik = new Brick(column*80, row*30, mybrick[1] || 1, currentLevel.getPower(mybrick[2]))
                this.bricks.push(brik);
                this.brickNumberArray.push(row*10+column);
                }
            }
        )
        this.init();
        // log(this.bricks);
    }

    init(){
        this.addEvents();
        gameOverDialog.style = winDialog.style = "display:none";          
        powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
        powerctx.beginPath();
        powerctx.fillStyle = "#fff"
        powerctx.fillRect(0, 0,this.width+10,this.height+10);
        this.brickSelected = true;
        this.makeSelector();
        this.draw();
    }
    removeEvents(){
        canvas.removeEventListener('mousemove',this.moveBrick);
        canvas.removeEventListener('click',this.placeBrick);
        powerCanvas.removeEventListener('click',this.select); 
    }
    addEvents(){
        canvas.addEventListener('mousemove',this.moveBrick);
        canvas.addEventListener('click',this.placeBrick);
        powerCanvas.addEventListener('click',this.select); 
    }
    moveBrick(e){
        var rct=canvas.getBoundingClientRect();
        levelCreator.x = e.clientX - rct.left ;
        levelCreator.y = e.clientY - rct.top -levelCreator.height;
        levelCreator.out = (levelCreator.x < 20 || levelCreator.y < 2) ? true : false;
        ;
        if (levelCreator.x < 0) levelCreator.x = 0 ;
        if (levelCreator.x > canvas.width - levelCreator.width) levelCreator.x = canvas.width - levelCreator.width;
        if (levelCreator.y < 0) levelCreator.y = 0 ;
        if (levelCreator.y > canvas.height - levelCreator.height) levelCreator.y = canvas.height - levelCreator.height;
        levelCreator.x = parseInt(levelCreator.x/80)*80;
        levelCreator.y = parseInt(levelCreator.y/30)*30
        levelCreator.draw();
        // log('hi')
        
        
    }
    placeBrick(e){
        var brickNumber =levelCreator.y/30*10 + levelCreator.x/80;
        var atIndex = levelCreator.brickNumberArray.indexOf(brickNumber)
        if(!brickAddMode){
            if(atIndex == -1) return;
            levelCreator.bricks.splice(atIndex,1);
            levelCreator.brickNumberArray.splice(atIndex,1);
            levelCreator.draw();
            return;
        }
        if (levelCreator.brickSelected ) {
            if(atIndex === -1){
                levelCreator.bricks.push(new Brick(levelCreator.x,levelCreator.y, levelCreator.damage));
                levelCreator.brickNumberArray.push(brickNumber);
            }
            else{
                levelCreator.bricks[atIndex]=new Brick(levelCreator.x,levelCreator.y, levelCreator.damage);
            }
        }
        else{  
            if (atIndex !==-1) {
                levelCreator.bricks[atIndex].power = new levelCreator.powers[levelCreator.selectedPowerIndex].constructor
                levelCreator.bricks[atIndex].placePower();
            }
            
        }
        levelCreator.draw()
    }

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bricks.forEach(
            (brick)=>{
                brick.draw(ctx,spritesCreator); 
                if(brick.power) brick.power.draw(ctx)
            }
        )
        if(!brickAddMode || this.out) return;
        if(this.brickSelected) ctx.drawImage(spritesCreator,0,0+(this.damage-1)*23,67,23,this.x +5,this.y+5,this.width,this.height);
        else {
            let pow = this.powers[this.selectedPowerIndex];
            pow.center ={x: this.x +40, y:this.y+15};
            pow.draw(ctx);
        }
    }

    makeSelector(){
        this.offset = 40;
        for (let i=0; i<6; i++){
        powerctx.drawImage(spritesCreator,0,i*23,67,23,i*(this.width+this.offset+30)+5, 5,this.width,this.height);}
        
        for (let i=0; i<this.powers.length; i++){
            let power = this.powers[i];
            power.center ={x:i*(40+this.offset)+5, y:40};
        powerctx.drawImage(...power.spriteLocation, power.center.x, power.center.y, 30, 30)
    }

    }

    select(e){
        var rct=powerCanvas.getBoundingClientRect();
        var x = e.clientX - rct.left ;
        var y = e.clientY - rct.top;
        if (y<40) {
            for (let i=0; i<6; i++){
                var pos = i*(levelCreator.width+levelCreator.offset+30)+5
                if (x>pos && x<pos+levelCreator.width) {
                    powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
                    powerctx.beginPath();
                    powerctx.fillStyle = "#fff"
                    levelCreator.damage = i+1; 
                    powerctx.fillRect(pos-5, 0, levelCreator.width+10, levelCreator.height+10 );
                    levelCreator.makeSelector();
                    levelCreator.brickSelected = true;
                    break;
                }
            }
            
        }
        else {
            for (var i=0; i<levelCreator.powers.length; i++){
                var pos =i*(40+levelCreator.offset)+5;
                if (x>pos && x<pos+40) {
                    powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
                    powerctx.beginPath();
                    powerctx.fillStyle = "#fff"
                    powerctx.arc(levelCreator.powers[i].center.x+15, levelCreator.powers[i].center.y+15, 19, 0, Math.PI * 2);
                    powerctx.fill();    
                    levelCreator.selectedPowerIndex =i;
                    levelCreator.brickSelected = false;
                    levelCreator.makeSelector();
                    break;
                }
            }
        }
        

    }
}
