

function Road(parent, x, y) {
    this.x = x;
    this.y = y;
    this.element = null;
    this.parent = parent;
  }

Road.prototype.create = function () {
    var lanDiv = document.createElement("div");
    lanDiv.style.left = this.x + "px";
    lanDiv.style.top = this.y + "px";
    lanDiv.classList.add("road-asset");
    lanDiv.style.backgroundImage = "url(./images/road-line.png";
    this.element = lanDiv
    this.parent.appendChild(lanDiv)
  }
  
  Road.prototype.draw = function () {
    this.element.style.top = this.y + 'px';
  }
  