class Bullets{
    constructor(){
        this.spriteLocation = [sprites2,11,3,36,103];
        this.firedBullets =[];
        this.width = 10;
        this.height = 25;
        this.speed = 5;
    }
    draw(ctx){
        ctx.drawImage(...this.spriteLocation, launcher.x-10, launcher.y-5,this.width,this.height);
        ctx.drawImage(...this.spriteLocation, launcher.x+launcher.width, launcher.y-5,this.width,this.height);
    }
    addBullets(){
        this.firedBullets.push({x:launcher.x-10,y:launcher.y-10},{x:launcher.x + launcher.width,y:launcher.y-10})
    }
    drawFiredBullets(ctx){
        this.firedBullets.forEach(
            (bullet)=>{
                ctx.drawImage(...this.spriteLocation,bullet.x, bullet.y, this.width, this.height);
                bullet.y -= this.speed;
            }
        )
    }

    checkBulletCollision(){
        for (let i=0; i<this.firedBullets.length;){
            let bullet=this.firedBullets[i];
            if (bullet.y < 0) {
                this.firedBullets.splice(i,1);
            }
            else i++;
        }
        
        // log(this.firedBullets)
        bricks.forEach(
            (brick,indx)=>{
                for (let i=0; i<this.firedBullets.length; i++){
                    let bullet=this.firedBullets[i];
                    if(bullet.x + this.width>brick.left && bullet.x < brick.right && bullet.y < brick.top ) {
                        this.firedBullets.splice(i,1);
                        handleDamage(brick,indx);
                        break;
                    }
                }
            }
        );
    }
}