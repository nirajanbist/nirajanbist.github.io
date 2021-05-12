var ctx=document.getElementById("playarea").getContext("2d");
var balls=[];
var ballCount=50;
var offset=10;
function resize(){
    window.WIDTH=window.innerWidth;
    window.HEIGHT=window.innerHeight - offset;
    ctx.canvas.width=window.WIDTH;
    ctx.canvas.height=window.HEIGHT;
}
function update(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    balls.forEach(function (ball){
        ball.collisionUpdate(balls);
        ctx.beginPath();
        ctx.arc(Math.floor(ball.pos.x),Math.floor(ball.pos.y) ,  Math.floor(ball.radius),0,2*Math.PI);
        ctx.fillStyle=ball.color;
        ctx.fill();
    })
    requestAnimationFrame(update)
}

resize();

for(var i=0; i<ballCount; i++){
    balls.push(new Ball(i));
}

window.addEventListener("resize",resize)
requestAnimationFrame(update);
