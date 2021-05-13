var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var carHeight = 110;
var carWidth = 55;
var laneIndex = ['001', '010', '100', '011', '101'];


var parentElement = document.getElementById('app');

var retry=false;

function startScreen() {

  var startScreen = document.getElementById('start-screen');
  startScreen.style.display = 'block';
  var startBtn = document.createElement('div');
  startBtn.classList.add('start-btn');
  startBtn.setAttribute('id', 'start-btn');
  startBtn.innerText = 'Start';

  startScreen.appendChild(startBtn);
  startBtn.addEventListener('click', function () {
    var game = new Game(parentElement);
    startScreen.style.display = 'none';
    game.init()
  });


}

var flag = 0;


class Game {
  constructor(parentElement){
  this.myCar = null;
  this.parentElement = parentElement;
  this.roadElements = [];
  this.otherCar = [];
  this.highScore = 0;
  this.bullets = [];
  this.gameLoop = null;
  this.speed = 7;
  this.bulletSpeed = 8;
  this.gameScore = 0;
  this.scoreContainer = null;
  this.highScoreContainer = null;
  this.ammoValueContainer = null;
  this.totalAmmo = 10;
  this.pointElement = null;
  this.pointAmmoElement = null;
  this.gameStopFlag = false;
  this.gameTime = 0;
  this.gameLoopTime = 0;
  
  }

  init() {
    this.highScore = localStorage.getItem('@highScore')||0;
    
    var myCarElement = new Car(this.parentElement, 10, 655, 0, 53, 132).createCar();
    myCarElement.moveToMiddleLane();
    this.myCar = myCarElement;
    var pointPop = document.createElement('div');
    pointPop.classList.add('hit-points');
    this.parentElement.appendChild(pointPop);
    this.pointElement = pointPop;

    var pointAmmo = document.createElement('div');
    pointAmmo.classList.add('hit-ammo');
    this.parentElement.appendChild(pointAmmo);
    this.pointAmmoElement = pointAmmo;

    //creating score element
    var scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-top');
    scoreContainer.innerText = "SCORE: "+'0';
    this.scoreContainer = scoreContainer;
    this.parentElement.appendChild(scoreContainer)
    //creating high score element
    var highScoreCont = document.createElement('div');
    highScoreCont.classList.add('high-score');
    highScoreCont.innerText = "HIGHSCORE: "+this.highScore;
    this.parentElement.appendChild(highScoreCont);
    this.highScoreContainer = highScoreCont;


    var ammoContainer = document.createElement('div');
    ammoContainer.classList.add('ammo-container');
    ammoContainer.innerText = "AMMO: "+this.totalAmmo;
    this.parentElement.appendChild(ammoContainer);
    this.ammoValueContainer = ammoContainer;

    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(this.parentElement, 0, (270 + 50) * i)
      lane.create();
      if (i == 0) {
        this.generateObstacle(i);
      }
      this.roadElements.push(lane);
    }


    this.animateLane();
    //Arrow Keys Handle

    document.addEventListener("keydown", function (event) {

      if (!this.gameStopFlag) {
        if (event.keyCode == 37 && this.myCar.currentLane != 1) {
          this.myCar.steerLeft();
        }
        if (event.keyCode == 39 && this.myCar.currentLane != 3) {
          this.myCar.steerRight();
        }
        if (event.keyCode == 32) {

          //checking if there is bullet available
          if (this.totalAmmo != 0) {
            var bullet = new Bullet(this.myCar.x, this.myCar.y, this.parentElement).create();
            this.bullets.push(bullet);
            this.totalAmmo--;
            this.ammoValueContainer.innerText = "AMMO: "+this.totalAmmo;
          }
        }
      }
    }.bind(this));

  }



animateLane() {
  this.gameLoop = setInterval(function () {
    //make car move faster after each 15 sec


    if (Math.floor((this.gameLoopTime) % 1000) == 0) {
      this.speed += 0.005;
      this.gameTime += Math.floor((this.gameLoopTime) / 1000);
      if (this.gameTime != 0 && this.gameTime % 5 === 0) {
        //generate ammo element
        this.generateObstacle(2, 2); //2 =amm0 generation
      }

    }



    this.roadElements.forEach(function (roadElement, index) {
      if (roadElement.y >= 790) {
        roadElement.y = -170; //reset y into intial position

        this.generateObstacle(2);



      }
      roadElement.y += this.speed;
      roadElement.draw();

    }.bind(this));

    this.otherCar.forEach(function (car, otherCarIndex) {
      this.checkCollision(this.myCar, car, 0);

      if (this.bullets.length != 0) {
        this.bullets.forEach(function (bullet, index) {
          bullet.y -= this.speed;
          bullet.draw();
          if (bullet.x == car.x) {
            this.checkCollision(bullet, car, 1);
          }

          if (bullet.y <= 20) {
            //remove the bullet element
            this.bullets = this.bullets.filter(function (element1) {
              return element1 != bullet;
            }.bind(this));
            bullet.element.remove();


          }

        }.bind(this));
      }
      if (car.y >= 800) {
        //remove car
        car.element.remove();
        this.otherCar = this.otherCar.filter(function (element) {
          return element != car;
        }.bind(this));


      }

      if (this.otherCar.length == 0) {
        //regenerate all car
        for (var i = 0; i < 2; i++) {
          this.generateObstacle(i);

        }
      }
      car.y += this.speed
      car.draw(); //update position

    }.bind(this));
    //if bullet y=0 then remove it


    //update game time
    this.gameLoopTime += Math.floor((1000 / FPS));
  }.bind(this), Math.floor(1000 / FPS));

}


generateObstacle(index, flag) {
  //flag =0 maincar ,1 obstacles and 2 ammo box
  var flag = flag || 1;
  var pattern = [];

  if (flag == 1) {
    var random = Math.floor(Math.random() * 5);
    pattern = laneIndex[random].split("");
  } else if (flag == 2) {
    var random = Math.floor(Math.random() * 3);
    pattern = laneIndex[random].split("");
  }



  for (var i = 2; i >= 0; i--) {
    //creating max two car object in single lane element
    if (parseInt(pattern[i]) === 1) {
      //create car if pattern value =1
      var car = null;
      if (flag == 2) {
        car = new Car(this.parentElement, 0, -200 * index, flag, 60, 60).createCar();
      } else {
        car = new Car(this.parentElement, 0, -200 * index, flag).createCar();
      }

      this.otherCar.push(car);
      //shifting position
      switch (i) {
        case 0:
          car.moveToLeftLane();
          break;
        case 1:
          car.moveToMiddleLane();
          break;
        case 2:
          car.moveToRightLane();
          break;
      }

    }

  }


}



checkCollision(myCar, otherCar, flag) {

  //flag 0 checking main car with others 1 bullet and other cars
  var myCar = myCar;
  if (myCar.x < otherCar.x + otherCar.width &&
    myCar.x + myCar.width > otherCar.x &&
    myCar.y < otherCar.y + otherCar.height &&
    myCar.y + otherCar.height > otherCar.y) {

    if (flag == 0) {
      if (otherCar.flag == 1) {
        clearInterval(this.gameLoop);
        //terminate game

        this.gameStopFlag = true;
        //move to
        //showing game over screen
        this.tryAgainContainer();
        
      } else if (otherCar.flag == 2) {
        //ammo increase
        this.totalAmmo += 3;
        //create point element
        this.pointAmmoElement.style.left = (otherCar.x + otherCar.width / 2 - 10) + 'px';
        this.pointAmmoElement.style.top = (otherCar.y + otherCar.height / 2) + 'px';
        this.pointAmmoElement.style.display = 'block';
        this.pointAmmoElement.innerText = '+3';
        setTimeout(function () {
          this.pointAmmoElement.style.display = 'none';
        }.bind(this), 210);

        this.ammoValueContainer.innerText = this.totalAmmo;

        this.otherCar = this.otherCar.filter(function (element) {
          return element != otherCar;
        }.bind(this));
        otherCar.element.remove();
      }
    }
    if (flag == 1 && otherCar.flag == 1) {
      //removing event listenter

      //bullet impact with other object

      //create point element
      this.pointElement.style.left = (otherCar.x + otherCar.width / 2 - 10) + 'px';
      this.pointElement.style.top = (otherCar.y + otherCar.height / 2) + 'px';
      this.pointElement.style.display = 'block';
      this.pointElement.innerText = '+5';
      setTimeout(function () {
        this.pointElement.style.display = 'none';
      }.bind(this), 210);

      //increase point
      this.gameScore += 5;
      this.scoreContainer.innerText = "SCORE: "+this.gameScore;
      //remove other car from list and dom
      this.otherCar = this.otherCar.filter(function (element) {
        return element != otherCar;
      }.bind(this));
      otherCar.element.remove();


      this.bullets = this.bullets.filter(function (element) {
        return element != myCar;
      }.bind(this));
      myCar.element.remove();

    }
  }

}

storeScore() {

  var prevScore = localStorage.getItem('@highScore');
  console.log(prevScore)

  if (this.gameScore > prevScore) {
    localStorage.setItem('@highScore', this.gameScore);
  }


}


tryAgainContainer() {
  this.storeScore();
  var mainContainer = document.getElementsByClassName('game-over-container')[0];
  mainContainer.style.display = 'block';
  var mainWrapper = document.getElementsByClassName('game-over-wrapper')[0];
  
  var heading = document.createElement('div');
  heading.classList.add('heading');
  heading.innerText = 'Game Over';
  
  var scoreValue = document.createElement('div');
  scoreValue.classList.add('score-value');
  var tryAgain = document.createElement('div');
  tryAgain.classList.add('try-again');
  
  mainWrapper.appendChild(heading);
  mainWrapper.appendChild(scoreValue);
  mainWrapper.appendChild(tryAgain);
  scoreValue.innerText = "Score: "+this.gameScore;
  
  
  tryAgain.addEventListener('click', function () {
    var allElement = parentElement.querySelectorAll('div');
    allElement.forEach(function (element) {

      if (!element.className.includes('initial-div')) {
        element.remove();
      }

    });
    startScreen();
    mainContainer.style.display = 'none';



  });
}
}
startScreen();