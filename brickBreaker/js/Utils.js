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

function resume(){
    creator=false;
    launcher.replay = true;
    requestAnimationFrame(nextFrame);
    
}


// var frameTimestamp = Date.now();

var fcount = 0; //count no. of frame for relative timing;
var bricks=[]
var fallingPowers = [];
var gameOver = false;
var win = false;

var score = 0;
var gameOverDialog = document.getElementById('game-over');
var winDialog = document.getElementById('you-won');
var scoreElement = document.getElementById('score-value');
var replayButton = document.getElementById('replay');
var nextStageButton = document.getElementById('next-stage');
var levelElement = document.getElementById('level');

var sprites = document.getElementById('sprite')
var sprites2 = document.getElementById('sprite2');
var spritesCreator = document.getElementById('spriteCreator');

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var powerCanvas = document.getElementById('powerCanvas');
var powerctx = powerCanvas.getContext('2d');
function resize(){
   canvas.width = canvas.parentElement.clientWidth;      
   canvas.height = canvas.parentElement.clientHeight;  
   powerCanvas.width = powerCanvas.parentElement.clientWidth;      
   powerCanvas.height = powerCanvas.parentElement.clientHeight;  

}
resize();
