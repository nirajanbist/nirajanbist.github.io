// import powerctx from "./Power.js"
class Launcher{
    constructor(){
        this.init();
    }
    init(){
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
        this.hasBullets = false ;
        this.hasSpeedDown = false ;
        this.hasSpeedUp = false ;
        this.holdBalls =[];
        this.scoreMultiplier = 1;
        this.bullets = new Bullets();
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

        if(this.hasBullets){
            this.bullets.draw(ctx);
        }
        if(this.bullets.firedBullets.length){
        this.bullets.checkBulletCollision();
        this.bullets.drawFiredBullets(ctx);}

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
            launcher.powers[currentIndex] = power;
        }
    }

    holdPosition(e){
        var rct=canvas.getBoundingClientRect();
        launcher.tempX = e.clientX - rct.left- launcher.width/2;
        if (launcher.tempX < 0) launcher.tempX = 0 + launcher.bullets.width * launcher.hasBullets;
        if (launcher.tempX > canvas.width - launcher.width) launcher.tempX = canvas.width - launcher.width-launcher.bullets.width * launcher.hasBullets;
        launcher.holdBalls.forEach(
            (hball)=>{
                hball.ball.center.x = launcher.x + hball.xdiff;
            }
        )
        if (launcher.hasBullets){

        }
    }
    


    checkPowerCollision(){
        fallingPowers.forEach(
            (power,index)=>{
                if (power.left < this.right && power.right > this.left && power.bottom > this.top ){
                    this.addPower(power);
                    fallingPowers.splice(index, 1);
                    // log(this.powers)
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

    onClick(e){
        if(e.target.id==='arcade'){
            document.getElementById('custom').classList.remove('active-mode')
            e.target.classList.add('active-mode')
            show(predef);
            hide(custom, createLevel)
            currentMode = 'arcade'
            return;
        }
        else if(e.target.id==='custom'){
            document.getElementById('arcade').classList.remove('active-mode')
            e.target.classList.add('active-mode')
            show(custom);
            hide(predef, createLevel)

            currentMode = 'custom';
            return;
            
        }
        else if (e.target.id === 'create-level'){
            show(createLevel,removeBrick)
            hide(custom)
            createCustomLevel();
            return;
        }
        
        var level = parseInt(e.target.id)
        if(level){
            if(currentMode=='arcade'){
            currentLevel.level = level;
            initLevel();
            if(clickedonce) {requestAnimationFrame(nextFrame); clickedonce=false;}
        }
            else{
                if(level==1) playCustomLevel(1);     
            }
            return;
        }
        launcher.holdBalls.forEach(
            (hball)=>{
                hball.ball.speed = hball.ball.savedSpeed;
            }
        );

        delete launcher.holdBalls;
        launcher.holdBalls =[];

        if (launcher.hasBullets){
            launcher.bullets.addBullets();
        }

    }
    getLauncherCenter(){
        return {x:this.x + this.width/2, y:this.y - firstBall.radius};
    }
    prepareBullets(){
        this.bullets = new Bullets();
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

class Bullets{
    constructor(){
        this.spriteLocation = [sprites2,11,3,36,103];
        this.firedBullets =[];
        this.width = 10;
        this.height = 25;
        this.speed = 5;
    }
    draw(ctx){
        ctx.drawImage(...this.spriteLocation, launcher.x-10, launcher.y-5,this.width,this.height);
        ctx.drawImage(...this.spriteLocation, launcher.x+launcher.width, launcher.y-5,this.width,this.height);
    }
    addBullets(){
        this.firedBullets.push({x:launcher.x-10,y:launcher.y-10},{x:launcher.x + launcher.width,y:launcher.y-10})
    }
    drawFiredBullets(ctx){
        this.firedBullets.forEach(
            (bullet)=>{
                ctx.drawImage(...this.spriteLocation,bullet.x, bullet.y, this.width, this.height);
                bullet.y -= this.speed;
            }
        )
    }

    checkBulletCollision(){
        for (let i=0; i<this.firedBullets.length;){
            let bullet=this.firedBullets[i];
            if (bullet.y < 0) {
                this.firedBullets.splice(i,1);
            }
            else i++;
        }
        
        // log(this.firedBullets)
        bricks.forEach(
            (brick,indx)=>{
                for (let i=0; i<this.firedBullets.length; i++){
                    let bullet=this.firedBullets[i];
                    if(bullet.x + this.width>brick.left && bullet.x < brick.right && bullet.y < brick.top ) {
                        this.firedBullets.splice(i,1);
                        handleDamage(brick,indx);
                        break;
                    }
                }
            }
        );
    }
}