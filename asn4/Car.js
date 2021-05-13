class Car{
    constructor(parentElement, x, y, flag, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 52;
    this.height = height || 105;
    this.element = null;
    this.currentLane = 0;
    this.parent = parentElement;
    this.flag = flag || 0; //0 mean main car and 1 mean obstacle car
  }
  
  createCar() {
    var car = document.createElement('div');
    switch (this.flag) {
      case 0:
        car.classList.add('my-car');
        break;
      case 1:
        car.classList.add('enemy');
        var randomCar = Math.floor(Math.random() * 5) + 1;
        car.style.backgroundImage = 'url(./images/car-' + randomCar + '.png)';
        break;
      case 2:
        car.classList.add('ammo-box');
        break;
  
    }
    car.style.left = this.x + 'px';
    car.style.top = this.y + 'px';
    car.style.width = this.width + 'px';
    car.style.height = this.height + 'px';
    this.element = car;
    this.parent.appendChild(car);
    return this;
  }
  
  delete() {
    this.parent.removeChild(this.element);
  }
  
  draw() {
  
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  
  }
  
  moveTo(valuex) {
    this.x = valuex;
    this.draw();
  }
  
  moveToMiddleLane() {
    this.x = MIDDLE_LANE_POSITION;
    this.currentLane = 2;
    this.draw();
  }
  
  moveToLeftLane() {
    this.x = LEFT_LANE_POSITION;
    this.currentLane = 1;
    this.draw();
  }
  
  moveToRightLane() {
    this.x = RIGHT_LANE_POSITION;
    this.currentLane = 3;
    this.draw();
  }
  
  steerLeft() {
    //decreasing value of x
    //if current lane index =1 mean end of road from left side
    if (this.currentLane != 1) {
      this.x = this.x - LANE_SHIFT;
      this.currentLane = this.currentLane - 1;
      this.laneSwitchAnimation(0);
      this.draw();
  
    }
  
  
  }
  
  steerRight() {
    //if current lane index =3 mean end of road from right side
    if (this.currentLane != 3) {
      this.x = this.x + LANE_SHIFT;
      this.currentLane = this.currentLane + 1;
      this.laneSwitchAnimation(1);
      this.draw();
  
    }
  }
  
  laneSwitchAnimation(temp) {
   
    var steps = 0;
    var dx = 6;
    var laneInterval = setInterval(function () {
      steps += dx;
  
      if (steps >= 35) {
        clearInterval(laneInterval);
        this.element.style.transform = 'rotate(0deg)';
      }
    }.bind(this), 23);
  
  }
}