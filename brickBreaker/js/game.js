

// import Ball from "./Ball.js"
var firstBall = new Ball();
firstBall.speed = 0;
var balls = [firstBall]
var launcher = new Launcher()
firstBall.center = launcher.getLauncherCenter()
launcher.holdBalls.push({ball:firstBall, xdiff: launcher.width/2})
// launcher.holdBalls.push(balls.pop())
// log(launcher.holdBalls)

// // for (x of range(10)) bricks.push(new Brick(x*80, 0*30, 5));
// // for (x of range(10)) bricks.push(new Brick(x*80, 1*30, 5, new Expand()));
// // for (x of range(10)) bricks.push(new Brick(x*80, 2*30, 5, new ChakraBallPower()));
// // for (x of range(10)) bricks.push(new Brick(x*80, 3*30, 5, new Magnet()));
// // for (x of range(10)) bricks.push(new Brick(x*80, 4*30, 5, new FireBallPower()));
// for (x of range(10)) bricks.push(new Brick(x*80, 5*30, 5, new ScoreMultiplier()));

var level1 = new BrickGrid([
    [0,1,'bx'],[1,3],[2,2,'sx'],[3,1],[5,2],[6,4,'m'],[7,1,'sh'],
    [13,1,'ex'],[34,5,'c'],[38,4,'b'],[47,5,'f']
]);
var currentLevel = level1;

bricks = currentLevel.onlybricks;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.forEach((brick)=>{brick.draw(ctx)})
    fallingPowers.forEach((power)=>power.draw(ctx));
    balls.forEach((ball)=>{ball.draw(ctx)})
    launcher.draw(ctx)

}

function handleDamage(brick,indx){
    var powerOnDestroy = brick.checkDamage(indx,bricks);
    if(powerOnDestroy) {
        fallingPowers.push(powerOnDestroy); //release power to the screen falling from top to bottom
    }
}

function checkBrickCollusion(ball){
    var left = ball.left 
    var right = ball.right
    var top = ball.top 
    var bottom = ball.bottom 
    var hitIndex = 0;
    var brick;
    
    if (ball instanceof ChakraBall) {
        for (let i=0; i<bricks.length; i++){
            brick=bricks[i];
            if (left < brick.right && right  > brick.left && top < brick.bottom && bottom  > brick.top )
                handleDamage(brick,i);
        }
        return;
    }

    for (let i=0; i<bricks.length; i++){
        brick=bricks[i];
        if (left < brick.right && right  > brick.left && top < brick.bottom && bottom  > brick.top ){
            var side = brick.getReflectionSide(ball.prevCenter)
            if (side == 'horizontal') ball.direction.y *= -1;
            else if (side == 'vertical') ball.direction.x *= -1;
            else {ball.direction.x *= -1; ball.direction.y *= -1;}

            handleDamage(brick,i)

            if(Math.abs(ball.direction.y) < 0.1){
                if (ball.direction.y < 0) ball.direction.y = - .27;
                else ball.direction.y = .27;
                ball.makeUnitDirection();
                console.log("less than");
                ball.center.x = ball.prevCenter.x;
                ball.center.y = ball.prevCenter.y;
            } 
            hitIndex = true;
            break; 
        }
    }

    if(hitIndex && ball instanceof FireBall){
        for (let i=0; i<bricks.length; i++){
            brick = bricks[i];
            if(left-ball.xoffset<brick.left &&
                    right+ball.xoffset>brick.right && 
                    top-ball.yoffset<brick.top && 
                    bottom + ball.yoffset > brick.bottom) handleDamage(brick,i);
            
        }
    }
}

function checkCanvasCollision(ball,index){
    if (ball.left < 0 || ball.right > canvas.width) 
    {
        ball.direction.x = -ball.direction.x;
        if (ball.left < 0) ball.left=0
        else ball.right=canvas.width
        // log(ball.direction)
    }
    if (ball.top < 0 || ball.bottom > canvas.height) 
    {
        ball.direction.y = - ball.direction.y;
        if (ball.top < 0) ball.top = 0;
        else {ball.bottom = canvas.height; 
            
            if (balls.length > 1)
               balls.splice(index,1);
            else
            gameOver = true;
        }
        // location.reload();
        // log(ball.direction)
    }
}


function checkCollusion(){
    launcher.x = launcher.tempX;
    balls.forEach((ball,index)=>{
        if(ball.speed){
        checkCanvasCollision(ball,index);
        checkBrickCollusion(ball);
        launcher.checkBallCollusion(ball);
        } 
    });
    launcher.checkPowerCollision(fallingPowers);  
}

function updateFrame(){
    balls.forEach((ball)=>{
        ball.update();
    });
    fallingPowers.forEach((power)=>power.update());
    scoreElement.innerText = '$'+score;
}

function nextFrame(){
    fcount++;
    var collectedScore = score;
    score=0;
    checkCollusion();
    draw();
    score*=7;
    score+=collectedScore;
    updateFrame();
    if (!bricks.length) win = true;
    if (!gameOver && !win) requestAnimationFrame(nextFrame);
    else if(gameOver){
        gameOverDialog.style = "display: block;"
        document.getElementById('game-over-score').innerText = '$'+score;
    }
    else {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        powerctx.clearRect(0,0,powerCanvas.width,powerCanvas.height);
        winDialog.style = "display: block;"
        document.getElementById('win-score').innerText = '$'+score;
    }
}

requestAnimationFrame(nextFrame)
window.addEventListener('resize',resize)
window.addEventListener('mousemove', launcher.holdPosition.bind(launcher))
window.addEventListener('click',launcher.onClick.bind(launcher));



