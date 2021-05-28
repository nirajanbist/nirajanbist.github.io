function handleDamage(brick,indx){
    var powerOnDestroy = brick.checkDamage(indx,bricks);
    if(powerOnDestroy) {
        fallingPowers.push(powerOnDestroy); //release power to the screen falling from top to bottom if brick is destroyed
    }
}

function resetStageForNextLife(){
    fcount = 0;
    fallingPowers =[]

    firstBall = new Ball();
    firstBall.speed = 0;
    balls = [firstBall]
    launcher.init();
    firstBall.center = launcher.getLauncherCenter()
    launcher.holdBalls=[];
    launcher.holdBalls.push({ball:firstBall, xdiff: launcher.width/2})
}

function handleLife(){
    if (lifeIndicators.childElementCount>1){
        lifeIndicators.removeChild(lifeIndicators.firstElementChild);
        resetStageForNextLife();
    }
    else{
        lifeIndicators.removeChild(lifeIndicators.firstElementChild);
        gameOver = true;
    }
}

function checkBrickCollusion(ball){
    var left = ball.left 
    var right = ball.right
    var top = ball.top 
    var bottom = ball.bottom 
    var hitIndex = 0;
    var brick;
    
    // ChakraBall collision Handle
    if (ball instanceof ChakraBall) {
        for (let i=0; i<bricks.length; i++){
            brick=bricks[i];
            if (left < brick.right && right  > brick.left && top < brick.bottom && bottom  > brick.top )
                handleDamage(brick,i);
        }
        return;
    }

    // Normal Ball Brick Collison Handle
    for (let i=0; i<bricks.length; i++){
        brick=bricks[i];
        if (left < brick.right && right  > brick.left && top < brick.bottom && bottom  > brick.top ){
            var side = brick.getReflectionSide(ball.prevCenter)
            if (side == 'horizontal') ball.direction.y *= -1;
            else if (side == 'vertical') ball.direction.x *= -1;
            else {ball.direction.x *= -1; ball.direction.y *= -1;}

            handleDamage(brick,i)

            // Handle if the vertical direction(increments) is too small
            if(Math.abs(ball.direction.y) < 0.1){
                if (ball.direction.y < 0) ball.direction.y = - .27;
                else ball.direction.y = .27;
                ball.makeUnitDirection();
                ball.center.x = ball.prevCenter.x;
                ball.center.y = ball.prevCenter.y;
            } 
            hitIndex = true;
            break; 
        }
    }

    // Also Affect Nearby Bricks if ball is FireBall
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

    // Canvas TOP Rebound back
    if (ball.left < 0 || ball.right > canvas.width) 
    {
        ball.direction.x = -ball.direction.x;
        if (ball.left < 0) ball.left=0
        else ball.right=canvas.width
    }

    // Rebound Up or Decrease Life if ball passed Launcher
    if (ball.top < 0 || ball.bottom > canvas.height) 
    {
        ball.direction.y = - ball.direction.y;
        if (ball.top < 0) ball.top = 0;
        else {ball.bottom = canvas.height; 
            
            if (balls.length > 1)
               balls.splice(index,1);
            else
            handleLife();
        }
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
