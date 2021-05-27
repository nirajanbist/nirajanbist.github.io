class Power {
    constructor(){
        this.time = 750;
        this.center = {x:300, y:400};
        this.bar ={x:60, y:20}
        this.width = 200;
        this.initialWidth = this.width;
        this.height = 15;
        this.activated = false;
        this.terminated = false;
        this.startTime = null;
        this.index = null;
        this.remainingTime = this.time;
        this.radius = 15;
        this.speed = 2;
        this.barLocation = [sprite2, 0,576, 282, 10];
    }

    draw(ctx){
        // ctx.beginPath();
        // ctx.arc(this.center.x , this.center.y ,this.radius, 0, 2 * Math.PI);       
        // // ctx.fillStyle='blue';
        // ctx.fill();
        ctx.drawImage(...this.spriteLocation, this.left, this.top, 30, 30);
    }

    update(){
        this.center.y += this.speed;
    }

    activate(indx){
        if(!this.activated) 
        {
            this.activated = true;
            this.index = indx;
            this.startTime = fcount;
            this.powerActivate();
            
        }        
    }
    terminate(){
        if(this.remainingTime<0) {
            log(this.type +' finsished');
            this.terminated = true;
            this.powerTerminate();
        }
    }

    drawBar(ctx){
        if (this.activated && !this.terminated){
        ctx.beginPath();
        ctx.fillStyle='#dd5145';
        // ctx.fillRect(this.bar.x + this.index*this.initialWidth,this.bar.y,this.width, this.height);
        
        // ctx.fillStyle ='white';
        // ctx.arc(this.bar.x + this.radius + this.index*this.initialWidth , this.bar.y + this.height/2 ,this.radius, 0, 2 * Math.PI); 
        // ctx.fill()
        ctx.font = "16px Arial";
        let remPercent = this.width/this.initialWidth * 100;
        let xCord = (this.index%3) * (this.bar.x +this.initialWidth + 10)
        let vCord =  parseInt(this.index/3) * 50 + this.bar.y ;

        ctx.drawImage(...this.spriteLocation,  xCord, vCord - this.height/2 ,30, 30);
        ctx.drawImage(...this.barLocation, xCord + 30, vCord, this.width, this.height);
        ctx.fillText(''+remPercent.toFixed(0)+' %',  xCord +32+ this.width ,vCord + this.height)
        this.remainingTime = this.time - (fcount - this.startTime)
        this.width = this.initialWidth  * (this.remainingTime/this.time); }
        this.terminate();

    }


    get top(){
        return this.center.y - this.radius;
    }

    get bottom(){
        return this.center.y + this.radius;
    }
    
    get left(){
        return this.center.x - this.radius;
    }
    
    get right(){
        return this.center.x + this.radius;
    }

    powerActivate(){}
    powerTerminate(){}
}

class Shrink extends Power{
    constructor(){
        super();
        this.scoreContent = 103;
        this.type = "Shrink";
        this.spriteLocation = [sprites2,215,5,60,60];
    }
    powerActivate(){
        if (launcher.width/2 >= launcher.minWidth) launcher.width /= 2;
        score += this.scoreContent;
    }
    // powerTerminate(){
    //     launcher.width *= 2;
    // }
}

class BulletPower extends Power{
    constructor(){
        super();
        this.scoreContent = 35;
        this.type = "Bullet";
        this.spriteLocation = [sprites2,215,65,60,60];
        this.time = 200;
    }
    powerActivate(){
        launcher.hasBullets = true;
    }
    powerTerminate(){
        launcher.hasBullets = false;
    }
}

class ChakraBallPower extends Power{
    constructor(){
        super();
        this.scoreContent = 50;
        this.type = "ChakraBall";
        this.spriteLocation = [sprites2,216,125,60,60];
    }
    powerActivate(){
        var newChakraBall = new ChakraBall()
        var dir = getRandomDirection();
        newChakraBall.direction = dir;
        newChakraBall.direction.y = -Math.abs(Math.sin(Math.random()*(Math.PI - 0.17)+0.17));
        newChakraBall.makeUnitDirection(); 
        newChakraBall.speed=0;
        newChakraBall.center = launcher.getLauncherCenter()
        launcher.holdBalls.push({ball:newChakraBall, xdiff: launcher.width/2})
        balls.push(newChakraBall)

        score += this.scoreContent;
    }
}

class ScoreMultiplier extends Power{
    constructor(){
        super();
        this.time = 300;
        this.scoreContent = 89;
        this.type = "X-Score";
        this.spriteLocation = [sprites2,216,185,60,60];
    }
    powerActivate(){
        launcher.scoreMultiplier = 2;
        score += this.scoreContent;
    }
    powerTerminate(){
        launcher.scoreMultiplier = 1;
    }
}
class Magnet extends Power{
    constructor(){
        super();
        this.scoreContent = 58;
        this.type = "Magnet";
        this.spriteLocation = [sprites2,216,245,60,60];
    }
    powerActivate(){
        launcher.hasMagnet = true;
        score += this.scoreContent;
    }
    powerTerminate(){
        launcher.hasMagnet = false;
    }
}

class BallMultiplier extends Power{
    constructor(){
        super();
        this.scoreContent = 44;
        this.type = "X-Ball";
        this.spriteLocation = [sprites2,216,365,60,60];
    }

    powerActivate(){
        balls.forEach(
            (ball)=>{
                let center = {...ball.center}
                let direction = getRandomDirection();
                let newball = new ball.constructor(center,direction);
                newball.direction.y += .28;
                if (Math.abs(newball.direction.y) < 0.1){
                    if (newball.direction.y < 0) newball.direction.y = - .27;
                    else newball.direction.y = .27;
                }
                newball.makeUnitDirection();
                balls.push(newball);
            }
        );

        score += this.scoreContent;
    }
}

class FireBallPower extends Power{
    constructor(){
        super();
        this.scoreContent = 77;
        this.type = "FireBall";
        this.spriteLocation = [sprites2,216,425,60,60];
    }
    powerActivate(){
        var newFireBall = new FireBall()
        var dir = getRandomDirection();
        newFireBall.direction = dir;
        newFireBall.direction.y = -Math.abs(Math.sin(Math.random()*(Math.PI - 0.27)+0.27));
        newFireBall.makeUnitDirection(); 
        newFireBall.speed=0;
        newFireBall.center = launcher.getLauncherCenter()
        launcher.holdBalls.push({ball:newFireBall, xdiff: launcher.width/2})
        balls.push(newFireBall)

        score += this.scoreContent;
    }
}

class Expand extends Power{
    constructor(){
        super();
        this.scoreContent = 83;
        this.type = "Expand";
        this.spriteLocation = [sprites2,216,485,60,60];
    }
    powerActivate(){
        if (launcher.width*2 <= launcher.maxWidth) launcher.width *= 2;
        score += this.scoreContent;
    }
    // powerTerminate(){
    //     launcher.width /= 2;
    // }
}

class SpeedUp extends Power{
    constructor(){
        super();
        this.type = "Speed";
        this.scoreContent = 97;
        this.spriteLocation = [sprites2,158,65,60,60];
    }
    powerActivate(){
        var setSpeed = 10;
        if(launcher.hasSpeedDown) {setSpeed = 6; this.time =0; launcher.hasSpeedDown = false}
        balls.forEach((ball)=>{
        if(ball.speed)ball.speed = setSpeed;});
        score += this.scoreContent;
        launcher.hasSpeedUp = true;
    }
    powerTerminate(){
        balls.forEach((ball)=>{
            if(ball.speed)ball.speed = 6;});
        launcher.hasSpeedUp = false;
    }
}

class SpeedDown extends Power{
    constructor(){
        super();
        this.scoreContent = 97;
        this.type = "Speed";
        this.spriteLocation = [sprites2,158,125,60,60];
    }
    powerActivate(){
        var setSpeed = 3;
        if(launcher.hasSpeedUp) {setSpeed = 6; this.time =0; launcher.hasSpeedUp = false}
        balls.forEach((ball)=>{
        if(ball.speed)ball.speed = setSpeed;});
        score += this.scoreContent;
        launcher.hasSpeedDown = true;
    }
    powerTerminate(){
        balls.forEach((ball)=>{
            if(ball.speed)ball.speed = 6;});
        launcher.hasSpeedDown = false;
    }
}
