// import powerctx from "./Power.js"
class Launcher{
    constructor(){
        this.powers = [] ;
        this.length = 1;
        this.width = 88;
        this.minWidth = this.width/4;
        this.maxWidth = this.width*4;
        this.height = 20;
        this.x = (canvas.width-this.width)/2 ;
        this.y = canvas.height-this.height -20 ;
        this.color=['maroon','red','green','black','orange','yellow']
        this.life = 10
        this.tempX=this.x;
        this.hasMagnet = false;
        this.hasBullets = false;
        this.holdBalls =[];
        this.scoreMultiplier = 1;
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.fillStyle=this.color[0]
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(sprites2,11,522,178,28,this.x,this.y,this.width,this.height)
        powerctx.clearRect(0,0, powerCanvas.width, powerCanvas.height)

        this.powers.forEach(
            (power, index)=>{
                if(power){
                if(power.terminated) this.powers[index]=null;
                else {
                    power.activate(index);
                    power.drawBar(powerctx);
                    // power.draw(ctx)
                }
                }
            }
        );

    }
    addPower(power){
        if (power instanceof Expand || power instanceof Shrink || power instanceof BallMultiplier ||
            power instanceof ChakraBallPower || power instanceof FireBallPower)  {power.powerActivate(); return}
        var currentIndex = -1;
        var blankIndex = -1;
        if (this.powers.length == 0) 
        blankIndex = 0;
        else {this.powers.forEach(
            (cpower,index)=>{
                if (cpower && cpower.type == power.type) currentIndex = index;
                else if (blankIndex == -1 && !cpower) blankIndex = index;
            }
        )}

        if (currentIndex === -1) {
            if (blankIndex == -1) blankIndex = this.powers.length;
            this.powers[blankIndex] = power;}
        else {
            // this.powers[currentIndex].powerTerminate();
            this.powers[currentIndex] = power;
        }
    }

    holdPosition(e){
        var rct=canvas.getBoundingClientRect();
        this.tempX = e.clientX - rct.left- this.width/2;
        if (this.tempX < 0) this.tempX = 0;
        if (this.tempX > canvas.width - this.width) this.tempX = canvas.width - this.width;
        this.holdBalls.forEach(
            (hball)=>{
                hball.ball.center.x = this.x + hball.xdiff;
            }
        )
    }
    


    checkPowerCollision(){
        fallingPowers.forEach(
            (power,index)=>{
                if (power.left < this.right && power.right > this.left && power.bottom > this.top ){
                    this.addPower(power);
                    fallingPowers.splice(index, 1);
                    log(this.powers)
                }
                else if( power.bottom > this.bottom) fallingPowers.splice(index,1);
            }
        );
    }
    
    checkBallCollusion(ball){
        if (ball.left < this.right && ball.right > this.left && ball.up){
            if(ball.bottom > this.top){
                if(ball.bottom < this.top + ball.radius ){
                    ball.direction.y = -Math.abs(ball.direction.y);

                    //change direction of ball relative to positon of strike on launcher
                    var diff =2*(this.x + this.width/2 - ball.center.x)/ this.width;
                    ball.direction.x -=  diff;
                    ball.makeUnitDirection();
                    
                    
                    if (Math.abs(ball.direction.y) < 0.1){
                        if (ball.direction.y < 0) ball.direction.y = - .27;
                        else ball.direction.y = .27;
                        ball.makeUnitDirection();
                        console.log("less than")
                    }
                    ball.center.x = ball.prevCenter.x;
                    ball.center.y = ball.prevCenter.y;
                    ball.bottom = launcher.top;
                    if (this.hasMagnet) {
                        // log('hi');
                        ball.savedSpeed = ball.speed; 
                        ball.speed = 0; 
                        this.holdBalls.push(
                                { ball:ball, 
                                  xdiff: (ball.center.x - this.x)
                                }
                            );
                        }
                }
                else if (ball.left < this.left){ ball.right = this.left; ball.direction.x = - Math.abs(ball.direction.x); ball.up = false;}
                else if (ball.right < this.right){ ball.left = this.right; ball.direction.x = Math.abs(ball.direction.x); ball.up = false;} 
            
            }
        }

    }

    onClick(){
        this.holdBalls.forEach(
            (hball)=>{
                hball.ball.speed = hball.ball.savedSpeed;
            }
        );

        delete this.holdBalls;
        this.holdBalls =[];

    }
    getLauncherCenter(){
        return {x:this.x + this.width/2, y:this.y - firstBall.radius};
    }
    get left(){
        return this.x;
    }
    get top(){
        return this.y;
    }
    get right(){
        return this.x + this.width;
    }
    get bottom(){
        return this.y + this.height;
    }

    set left(val){
        this.x = val;
    }
}