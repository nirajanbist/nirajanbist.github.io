class Ball{
    constructor(center = null,direction = null){
        this.sx=0;
        this.sy=0;
        this.sw=0;
        this.sh=0;
        this.width=this.sw;
        this.height=this.sh;
        this.damage=0;
        this.speed=5;
        this.savedSpeed = this.speed;
        this.center= center || {x:356, y:400};
        this.direction= direction || {x:Math.cos(getRadian(-30)), y:Math.sin(getRadian(-30))};
        this.radius=10;
        this.prevCenter={x: 0, y:0};
        this.up = true;
    }

    makeUnitDirection(){
        let x = this.direction.x
        let y = this.direction.y
        let dist = Math.sqrt(x*x + y*y)
        this.direction.x = x/dist;
        this.direction.y = y/dist;
       
    }

    draw(ctx){
        ctx.save()
        ctx.drawImage(sprites,69,28,28,28,this.left,this.top,20,20);
        ctx.restore();
    }

    update(){
        this.prevCenter.x = this.center.x;
        this.prevCenter.y = this.center.y;

        this.center.x += this.speed * this.direction.x;
        this.center.y += this.speed * this.direction.y;
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

    set left(val){
        this.center.x = val+this.radius;
    }

    set right(val){
        this.center.x = val-this.radius;
    }
    
    set top(val){
        this.center.y = val+this.radius;
    }

    set bottom(val){
        this.center.y = val-this.radius;
    }
    
}


class FireBall extends Ball{
    constructor(center = null, direction =null){
        super(center, direction);
        this.ht = 45;
        this.n = 0;

    }
    
    getRotation(){
        let angle = Math.atan2(Math.abs(this.direction.y),Math.abs(this.direction.x)) ;
        if (this.direction.x < 0){
            return (this.direction.y < 0)? angle: -angle;
        }
        else if(this.direction.x > 0){
            return (this.direction.y < 0)? Math.PI-angle: Math.PI+ angle;
        }

    }

    slow(){
        if(fcount%10==0){
            this.n = (this.n +1)%6;
        }
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(this.getRotation())
        ctx.drawImage(sprites2,4,131+this.ht*this.n,135,45,-this.radius,-this.radius,135/2,45/2);
        this.slow()
        ctx.restore();
    }

}

class ChakraBall extends Ball{
    constructor(center = null, direction =null){
        super(center, direction);
        this.ht = 55;
        this.n = 0;
        this.radius = 15;
    }
    
    slow(){
        if(fcount%3==0){
            this.n = (this.n +1)%4;
        }
    }

    draw(ctx){
        ctx.drawImage(sprites2,152,192+this.ht*this.n,57,55,this.left,this.top,30,30);
        this.slow()
    }

}
