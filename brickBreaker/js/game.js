

var firstBall = new Ball();
var balls = [firstBall]
var launcher = new Launcher()
var creator = false;
var levelCreator;
var currentGrid = new BrickGrid(1);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.forEach((brick)=>{brick.draw(ctx)})
    fallingPowers.forEach((power)=>power.draw(ctx));
    balls.forEach((ball)=>{ball.draw(ctx)})
    launcher.draw(ctx)

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
    levelElement.innerText = "Level " + ((currentGrid.level > 0)?currentGrid.level:"custom");
    highestScoreElement.innerText = highestScore;
    currentGrid.init();
    bricks= currentGrid.bricks;
}

var predefinedLevelElements=[];
var customLevelElements=[];
var darea;
var predef;
var custom;
var createLevel;
var addBrick;
var removeBrick;

function makeLevelButtons(){
    darea = document.getElementById('display-area')
    predef = document.createElement('div')
    predef.id = "predefined-levels"
    custom = document.createElement('div')
    custom.id = "custom-levels"
    var level;
    function divCreate(id,txt,disp='block'){
        level = document.createElement('div')
        level.classList.add('btn','w1','tc','level',disp)
        level.innerText = txt;
        level.id = id;
        return level;
    }

    for(let i=1; i<=5; i++){
        divCreate(i+'level',"Level " + i);
        predefinedLevelElements.push(level);
        level.classList.add('disabled')
        if(i==1) {level.classList.add('level-active'); level.classList.remove('disabled')}
        predef.append(level)
    }
        
        divCreate('create-level', "Save Custom Levels");
        custom.append(level)
        divCreate('save-level', "Save Level");
        level.classList.add('none');        

    for(let i=1; i<=totalCustomLevels; i++){

        divCreate(i+'clevel',"Play Custom Level " +i);
        var play = level;
        divCreate(i+"elevel","Edit");
        var edit = level;

        var div = document.createElement('div');
        div.classList.add('flex')
        div.append(play,edit)
        custom.append(div)
    }
    
    divCreate('save-level', "Set Stage",'none');
    darea.appendChild(level)
    createLevel = level;
    createLevel.onclick = resumeGame;
    
    divCreate('add-brick', "ADD BRICK",'none');
    darea.appendChild(level)
    addBrick=level;

    divCreate('remove-brick', "REMOVE BRICK",'none');
    darea.appendChild(level)
    removeBrick =level;
    addBrick.onclick = removeBrick.onclick = toggleEditMode;

    custom.classList.add('none')
    darea.appendChild(predef)
    darea.appendChild(custom)

}

window.onload = ()=>{
    levelCreator = new LevelCreator();
    makeLevelButtons()
    initLevel();
    addWindowEvents();
    requestAnimationFrame(nextFrame);
}
