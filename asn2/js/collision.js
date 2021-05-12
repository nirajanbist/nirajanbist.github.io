var container = document.getElementById("container");
var c = document.getElementById("myCanvas");
// var cStyle=window.getComputedStyle(myDivs[0]);
// var containerWidth=parseInt(cStyle.getPropertyValue('width'))

var ctx = c.getContext("2d");
ctx.fillStyle='#000'
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill()

var circle1 = {radius: 20, x: 5, y: 5};
var circle2 = {radius: 12, x: 10, y: 5};

var dx = circle1.x - circle2.x;
var dy = circle1.y - circle2.y;
var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < circle1.radius + circle2.radius) {
    // collision detected!
}

function Point(x, y, index) {
  this.x = x;
  this.y = y;
  this.index = index;

  this.element = document.createElement('div');

  this.element.style.left = x + 'px';
  this.element.style.top = y + 'px';
  this.element.classList.add('circle');
  this.draw = function() {
    console.log(this)
  }

  this.element.addEventListener(
    'click',
    function () {
      this.draw();
      canvas.removeChild(this.element);
      points.splice(this.index, 1);
      pointsObjArray.splice(this.index, 1);

      pointsObjArray.forEach(function (point, index) {
        point.index = index;
      });
    }.bind(this)
  );
}

// points.filter(function(point) {
//   return point.x !== removedPoint.x && point.y !== removedPoint.y
// })

var points = [
  // 0 this.index
  { x: 60, y: 200 }, // 1 = 0 this.index = 1
  { x: 160, y: 200 }, // 2 = 1 this.index = 2
  { x: 360, y: 200 }, // 3 = 2
  { x: 260, y: 200 }, // 4 = 3
  { x: 60, y: 0 }, // 5
  { x: 10, y: 200 }, // 6
  { x: 100, y: 200 }, // 7
  { x: 20, y: 50 }, // 8
  { x: 60, y: 200 },
];

var canvas = document.getElementById('canvas');

var pointsObjArray = [];
points.forEach(function (point, index) {
  var pointObj = new Point(point.x, point.y, index);
  pointsObjArray.push(pointObj);

  canvas.appendChild(pointObj.element);
});
