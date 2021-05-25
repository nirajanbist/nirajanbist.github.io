

// import Ball from "./Ball.js"
var firstBall = new Ball();
firstBall.speed = 0;
var balls = [firstBall]
var launcher = new Launcher()
firstBall.center = launcher.getLauncherCenter()
launcher.holdBalls.push({ball:firstBall, xdiff: launcher.width/2})
// launcher.holdBalls.push(balls.pop())
log(launcher.holdBalls)

for (x of range(12)) bricks.push(new Brick(x*80, 0*30, 6));
for (x of range(12)) bricks.push(new Brick(x*80, 1*30, 5, new Expand()));
for (x of range(12)) bricks.push(new Brick(x*80, 2*30, 2, new ChakraBallPower()));
for (x of range(12)) bricks.push(new Brick(x*80, 3*30, 1, new Magnet()));
for (x of range(12)) bricks.push(new Brick(x*80, 4*30, 1, new FireBallPower()));
for (x of range(12)) bricks.push(new Brick(x*80, 5*30, 2, new BallMultiplier()));

// var level1 = new BrickGrid([
//     [0],[1],[2,2],[3,1],[5],[11,4,'m']
// ]);
// var currentLevel = level1;

// bricks = currentLevel.onlybricks;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.forEach((brick)=>{brick.draw(ctx)})
    fallingPowers.forEach((power)=>power.draw(ctx));
    balls.forEach((ball)=>{ball.draw(ctx)})
    launcher.draw(ctx)

}



function checkBrickCollusion(ball){
    var xtra = 40;
    var left = ball.left 
    var right = ball.right
    var top = ball.top 
    var bottom = ball.bottom 
    var once = 1;
    var mul = 0;
    var collusionFlag;
    bricks.forEach(
        (brick,index)=>{
        collusionFlag=false;
        if (left - xtra*mul < brick.right && right + xtra*mul > brick.left && top-xtra*mul < brick.bottom && bottom +xtra*mul > brick.top ){
            if(once){
            var side = brick.getReflectionSide(ball.prevCenter)
            if (side == 'horizontal') ball.direction.y *= -1;
            else if (side == 'vertical') ball.direction.x *= -1;
            else {ball.direction.x *= -1; ball.direction.y *= -1;}
            }
            collusionFlag = true;
            
        }

        if(collusionFlag) {
            
            var powerOnDestroy = brick.checkDamage(index,bricks);
            if(powerOnDestroy) {
                fallingPowers.push(powerOnDestroy); //release power to the screen falling from top to bottom
            }
            if (once){
                if(Math.abs(ball.direction.y) < 0.1){
                if (ball.direction.y < 0) ball.direction.y = - .27;
                else ball.direction.y = .27;
                ball.makeUnitDirection();
                console.log("less than");
                ball.center.x = ball.prevCenter.x;
                ball.center.y = ball.prevCenter.y;
                once=0;
                mul=1;
                }
            }
        }
    });
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

function checkLauncherCollision(ball){
    
}

function checkCollusion(){
    launcher.x = launcher.tempX;
    balls.forEach((ball,index)=>{
        if(ball.speed){
        checkCanvasCollision(ball,index);
        checkBrickCollusion(ball);
        // checkLauncherCollision();
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
    checkCollusion();
    draw();
    updateFrame();
    if (!gameOver) requestAnimationFrame(nextFrame);
    else{
        gameOverDialog.style = "display: block;"
    }
}

requestAnimationFrame(nextFrame)
window.addEventListener('resize',resize)
window.addEventListener('mousemove', launcher.holdPosition.bind(launcher))
window.addEventListener('click',launcher.onClick.bind(launcher));



