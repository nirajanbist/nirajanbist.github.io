class Brick{
    constructor(x=120,y=80,damage=1,pow=null){
        this.type = null; //ice soid metal
        this.damage = damage;
        this.strength = damage;
        this.power = pow;
        this.width = 67;
        this.height = 23;
        this.x = x + 5 ;
        this.y = y + 5;
        this.color=['#0084ff','red','green','black','orange','yellow']
        this.placePower();

    }


    draw(ctx, spritess=sprites){
        // ctx.beginPath();
        // ctx.fillStyle=this.color[this.damage-1]
        // ctx.fillRect(this.left, this.top, this.width, this.height);
        ctx.drawImage(spritess,0,0+(this.damage-1)*23,67,23,this.x,this.y,this.width,this.height);

    }
    placePower(){
        if(this.power){
        this.power.center.x = this.x + this.width/2;
        this.power.center.y = this.y + this.height/2;
        }
    }
    getNearestCornorFrom(point){
        var X, signx=1;
        if (point.x < this.x + this.width/2){
            X=this.left;
        }
        else {X=this.right;
            signx=-1;}

        var d1 = getDistance(point, {x:X, y:this.top});
        var d2 = getDistance(point, {x:X, y:this.bottom});
        return (d1<d2)? {x:X, y:this.top, signx:signx, signy:1} : {x:X, y:this.bottom, signx:signx, signy:-1};

    }
    getReflectionSide(point){
        var mid= 4;
        var corner = this.getNearestCornorFrom(point);
        var p1 = {x: corner.x + mid*corner.signx, y:corner.y} 
        var p2 = {x: corner.x , y:corner.y + mid*corner.signy} 
        var d1 = getDistance(point,p1)
        var d2 = getDistance(point,p2)
        if (d1<d2) return 'horizontal';
        else if( d1>d2) return 'vertical';
        else return 'both';

    }

    checkDamage(index, bricks){
        this.damage--;
        score += (this.strength - this.damage )* launcher.scoreMultiplier ;
        // score = parseInt(score);
        if (!this.damage) 
        {
            bricks.splice(index,1);
            return this.power;
        }

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