class Bullet{
    constructor(x, y, parent) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 10;
    this.element = null;
    this.parent = parent;
  
  }
  create() {
  
    var bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.top = this.y + 'px';
    bullet.style.left = (this.x + 26) + 'px';
    this.element = bullet;
    this.parent.appendChild(bullet);
    return this;
  }
  draw() {
    this.element.style.top = this.y + 'px';
  }
  
  
}