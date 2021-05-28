

var firstBall = new Ball();
var balls = [firstBall]
var launcher = new Launcher()
var creator = false;
var levelCreator;
var currentLevel = new BrickGrid(1);

initLevel();


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
    scoreElement.innerText = score;
}

function nextFrame(){
    if(creator) return;
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
        document.getElementById('game-over-score').innerText = score;
        setHighScore();
    }
    else if(win) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        powerctx.clearRect(0,0,powerCanvas.width,powerCanvas.height);
        winDialog.style = "display: block;"
        document.getElementById('win-score').innerText = score;
        previousStageScore = score;
        setHighScore();
    }
}


function addWindowEvents(){
    window.addEventListener('mousemove', launcher.holdPosition)
    window.addEventListener('click',launcher.onClick);
    resumeBtn.addEventListener('click',resumeGame);
    replayButton.addEventListener('click',playCurrentLevel)
    nextStageButton.addEventListener('click', playNextLevel)
}

function removeWindowEvents(){
    window.removeEventListener('mousemove', launcher.holdPosition)
    window.removeEventListener('click',launcher.onClick);
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

function playNextLevel(e){
    if(e) e.stopPropagation();
    if(currentMode=='arcade'){
        previousStageScore = score;
        document.getElementById(currentLevelId).classList.remove('level-active');
        currentLevel.level++;
        currentLevelId =currentLevel.level + 'level';
        document.getElementById(currentLevelId).classList.add('level-active');
        if(currentLevel.level === 1) previousStageScore = 0;
        playCurrentLevel()
    }
    else{
        if(currentLevel.customBricks[Math.abs(currentLevel.level)+1].length>0){
            document.getElementById(currentLevelId).classList.remove('level-active');
            currentLevel.level--;
            currentLevelId =Math.abs(currentLevel.level)+ 'clevel';
            document.getElementById(currentLevelId).classList.add('level-active');
            playCurrentLevel();
        };

    }
}

function playCurrentLevel(e){
    if(e) e.stopPropagation();
    initLevel()
    score = previousStageScore;
    requestAnimationFrame(nextFrame);
}

function playCustomLevel(level){
    
    currentLevel.level = -level;
    score=0;
    initLevel();
    if(clickedonce){
        requestAnimationFrame(nextFrame)
        clickedonce = false;
    }
}

function initLevel(){
    win = false;
    winDialog.style = "display:none";
    fcount = 0;
    fallingPowers =[]
    firstBall = new Ball();
    firstBall.speed = 0;
    balls = [firstBall]
    launcher.init();
    firstBall.center = launcher.getLauncherCenter()
    launcher.holdBalls=[];
    launcher.holdBalls.push({ball:firstBall, xdiff: launcher.width/2})
    levelElement.innerText = "Level " + ((currentLevel.level > 0)?currentLevel.level:"custom");
    highestScoreElement.innerText = highestScore;
    currentLevel.init();
    bricks= currentLevel.bricks;
}

window.onload = ()=>{
    levelCreator = new LevelCreator();
    makeDivs();
    requestAnimationFrame(nextFrame);
}
function makeDivs(){
    darea = document.getElementById('display-area')
    predef = document.createElement('div')
    predef.id = "predefined-levels"
    custom = document.createElement('div')
    custom.id = "custom-levels"
    var level;
    function divCreate(id,txt){
        level = document.createElement('div')
        level.classList.add('btn','w1','tc','level')
        level.innerText = txt;
        level.id = id;
        return level;
    }

    for(let i=1; i<=5; i++){
        divCreate(i+'level',"Level " + i);
        predefinedLevelElements.push(level);
        predef.append(level)
    }
        
        divCreate('create-level', "Save Custom Levels");
        custom.append(level)
        divCreate('save-level', "Save Level");
        level.classList.add('none');        

    for(let i=1; i<=5; i++){

        divCreate(i+'clevel',"Play Custom Level " +i);
        // level.addEventListener('click', playCustomLevel);
        var play = level;
        divCreate(i+"elevel","Edit");
        var edit = level;
        var div = document.createElement('div');
        div.classList.add('flex')
        div.append(play,edit)
        // customLevelElements.push(level);
        custom.append(div)
    }
    
    divCreate('save-level', "Save Level");
    level.classList.add('none');
    darea.appendChild(level)
    createLevel = level;
    createLevel.onclick = resumeGame;
    
    divCreate('add-brick', "ADD BRICK");
    level.classList.add('none');
    darea.appendChild(level)
    addBrick=level;

    divCreate('remove-brick', "REMOVE BRICK");
    level.classList.add('none');
    darea.appendChild(level)
    removeBrick =level;
    addBrick.onclick = removeBrick.onclick = toggleEditMode;

    custom.classList.add('none')
    darea.appendChild(predef)
    darea.appendChild(custom)
    predefinedLevelElements[0].classList.add('level-active');

}
var predefinedLevelElements=[];
var customLevelElements=[];
var darea;
var predef;
var custom;
var createLevel;
var addBrick;
var removeBrick;
addWindowEvents();