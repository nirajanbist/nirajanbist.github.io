function getRadian(degree){
    return degree * Math.PI / 180;
}

function range(number){
    return Array(number).keys()
}

function getRandomDirection(){
    let rad = Math.random() * (Math.PI - 0.17) + 0.17;
    let x = Math.cos(-rad);
    let y = Math.sin(-rad);
    return {x:x, y:y};
}
function log(...args){
    console.log(...args);
}

function getDistance(point,corner){
    var x = point.x-corner.x;
    var y = point.y-corner.y;
    return Math.sqrt(x*x + y*y )
}
function createCustomLevel(level){
    removeWindowEvents();
    show(createLevel,removeBrick)
    hide(custom)
    brickAddMode = true;
    levelCreator.prepare(level);
    creator = true;
}

function resumeGame(e){
    if(creator){
    levelCreator.removeEvents();
    addWindowEvents();
    creator = false;
    clickedonce = true;
    show(custom);
    hide(createLevel,addBrick,removeBrick);
    currentGrid.makeCustomLevel(levelCreator.level);
    levelCreator.out = true;
    levelCreator.draw();
}
}

function toggleEditMode(){
    if (brickAddMode){
        show(addBrick);
        hide(removeBrick);
        brickAddMode = false;
    }
    else{
        show(removeBrick);
        hide(addBrick);
        brickAddMode = true;
    }
}

function hide(...el){
    el.forEach(
        (elem)=>{
        elem.classList.remove('block');
        elem.classList.add('none');
        }
    )
}
function show(...el){
    el.forEach(
        (elem)=>{
        elem.classList.remove('none');
        elem.classList.add('block')
        }
    )
}
function setHighScore(){
    if(highestScore < score && currentGrid.level > 0) {
        localStorage.setItem('@highScore',score);
        highestScore = score;
        highestScoreElement.innerText = score;
    }

}

function getHighScore(){
    return localStorage.getItem('@highScore') || 0;
}

function displayInfo(text){
    infoDiv.innerText = text;
    show(infoDiv);
    setTimeout(()=>hide(infoDiv),3000)
}
//GLOBAL VARIABLES
var fcount = 0; //count no. of frame for relative timing;
var currentMode = 'arcade';
var bricks=[]
var fallingPowers = [];
var gameOver = false;
var win = false;
var clickedonce;
var brickAddMode = true;
var currentLevelId = '1level'
var totalCustomLevels = 7;

var score = 0;
var previousStageScore = 0;
var highestScore = getHighScore();
var gameOverDialog = document.getElementById('game-over-container');
var winDialog = document.getElementById('you-won-container');
var scoreElement = document.getElementById('score-value');
var highestScoreElement = document.getElementById('highest-score');
var replayButton = document.getElementById('replay');
var nextStageButton = document.getElementById('next-stage');
var levelElement = document.getElementById('level');
var lifeIndicators = document.getElementById('life-indicators');
var resumeBtn = document.getElementById('resume');
var infoDiv = document.getElementById('info');

var sprites = document.getElementById('sprite')
var sprites2 = document.getElementById('sprite2');
var spritesCreator = document.getElementById('spriteCreator');

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var powerCanvas = document.getElementById('powerCanvas');
var powerctx = powerCanvas.getContext('2d');


function resizeCanvas(){
   canvas.width = canvas.parentElement.clientWidth;      
   canvas.height = canvas.parentElement.clientHeight;  
   powerCanvas.width = powerCanvas.parentElement.clientWidth;      
   powerCanvas.height = powerCanvas.parentElement.clientHeight;  

}
resizeCanvas();
