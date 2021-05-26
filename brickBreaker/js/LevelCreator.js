class LevelCreator{
    constructor(){
        this.bricks=[];
        this.width =67;
        this.height = 23;
        this.damage = 1;
        this.selectedPowerIndex =  -1; 
        this.x=-0;
        this.y=0;
        this.powers=[
            new Magnet(),new SpeedUp(),new SpeedDown(),new BallMultiplier(),
            new ScoreMultiplier(),new Expand(),new Shrink(),new BulletPower(),
            new FireBallPower(),new ChakraBallPower()
        ]
        this.brickArray=[];
        canvas.addEventListener('mousemove',this.moveBrick.bind(this));
        canvas.addEventListener('click',this.placeBrick.bind(this));
        powerCanvas.addEventListener('click',this.select.bind(this));
    }
    init(){
        
        
        powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
        powerctx.beginPath();
        powerctx.fillStyle = "#fff"
        powerctx.fillRect(0, 0,this.width+10,this.height+10);
        this.brickSelected = true;
        
        this.makeSelector();
        this.draw();
    }
    moveBrick(e){
        // e.stopPropagation()
        if(!creator) return;
        e.stopPropagation();
        var rct=canvas.getBoundingClientRect();
        this.x = e.clientX - rct.left ;
        this.y = e.clientY - rct.top -this.height;
        ;
        if (this.x < 0) this.x = 0 ;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0 ;
        if (this.y > canvas.height - this.height) this.y = canvas.height - this.height;
        this.x = parseInt(this.x/80)*80;
        this.y = parseInt(this.y/30)*30
        this.draw();
        // log('hi')
        
        
    }
    placeBrick(e){
        if(!creator) return;
        e.stopPropagation();
        var brickNumber =this.y/30*10 + this.x/80;
        var atIndex = this.brickArray.indexOf(brickNumber)
        if (this.brickSelected ) {
            if(atIndex === -1){
                this.bricks.push(new Brick(this.x,this.y, this.damage));
                this.brickArray.push(brickNumber);
                log(brickNumber)
            }
            else{
                this.bricks[atIndex]=new Brick(this.x,this.y, this.damage);
            }
        }
        else{  
            if (atIndex !==-1) {
                log(brickNumber,'hi')
                this.bricks[atIndex].power = new this.powers[this.selectedPowerIndex].constructor
                this.bricks[atIndex].placePower();
            }
            
        }
        this.draw()
    }

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bricks.forEach(
            (brick)=>{
                brick.draw(ctx,spritesCreator); 
                if(brick.power) brick.power.draw(ctx)
            }
        )
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
        if(!creator) return;
        e.stopPropagation();
        var rct=powerCanvas.getBoundingClientRect();
        var x = e.clientX - rct.left ;
        var y = e.clientY - rct.top;
        if (y<40) {
            for (let i=0; i<6; i++){
                var pos = i*(this.width+this.offset+30)+5
                if (x>pos && x<pos+this.width) {
                    powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
                    powerctx.beginPath();
                    powerctx.fillStyle = "#fff"
                    this.damage = i+1; 
                    powerctx.fillRect(pos-5, 0, this.width+10, this.height+10 );
                    this.makeSelector();
                    this.brickSelected = true;
                    break;
                }
            }
            
        }
        else {
            for (var i=0; i<this.powers.length; i++){
                var pos =i*(40+this.offset)+5;
                if (x>pos && x<pos+40) {
                    powerctx.clearRect(0, 0, powerCanvas.width, powerCanvas.height)
                    powerctx.beginPath();
                    powerctx.fillStyle = "#fff"
                    powerctx.arc(this.powers[i].center.x+15, this.powers[i].center.y+15, 19, 0, Math.PI * 2);
                    powerctx.fill();    
                    this.selectedPowerIndex =i;
                    this.brickSelected = false;
                    this.makeSelector();
                    break;
                }
            }
        }
        

    }
}
