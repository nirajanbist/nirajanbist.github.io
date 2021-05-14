var myDivs = document.getElementsByClassName("carousel-image-wrapper");
var outerDivs = document.getElementsByClassName("carousel-container");
function getWidth(){
for (var i = 0; i < outerDivs.length; i++) {
  outerDivs[i].cStyle=window.getComputedStyle(outerDivs[i])
  outerDivs[i].containerWidth=parseInt(outerDivs[i].cStyle.getPropertyValue('width'))
}
}
getWidth();

function clearTimer(elem){
  clearTimeout(elem.parentElement.hold)
  clearInterval(elem.parentElement.timer)
 clearInterval(elem.parentElement.timer2)
}
// var currentIndex=0;
function leftrightButtons(elem){
  elem.leftbtn = document.createElement('div');
  elem.rightbtn=document.createElement('div');
  elem.leftbtn.classList.add('lbtn')
  elem.rightbtn.classList.add('rbtn')
  elem.append(elem.leftbtn);
  elem.append(elem.rightbtn);
}
function dotmaker(cnt,parent){
  this.elem=document.createElement('div')
  this.elem.classList.add('dots')
  
  console.log(parent)
  parent.dots=[]
  for (var i=0; i<cnt;i++){
    var dot = document.createElement('div')
    dot.index=i;
    parent.dots.push(dot)
    dot.classList.add('dot')
    if (i===0){ 
      parent.lastActive=dot
      dot.classList.add('active-dot')
    }
    dot.addEventListener('click',function(e){
      clearTimer(parent)
      parent.parentElement.hold=setTimeout(function(){this.parentElement.currentIndex+=1; goRight(this);}.bind(parent),4000)
      parent.left=-e.target.index*parent.parentElement.containerWidth
      parent.style.left=-e.target.index*parent.parentElement.containerWidth+'px'
      e.target.classList.add('active-dot')
      parent.lastActive.classList.remove('active-dot')
      parent.lastActive=e.target
      parent.parentElement.currentIndex=e.target.index
    })
    this.elem.appendChild(dot)
  }
  return this.elem;
}
for (var i = 0; i < outerDivs.length; i++) {
  leftrightButtons(outerDivs[i])
  outerDivs[i].currentIndex=0
}
for (var i = 0; i < myDivs.length; i++) {
  var element = myDivs[i];
  element.imageCount=element.childElementCount;
  element.left=0;
  element.parentElement.leftbtn.addEventListener('click',function(event){
    event.target.parentElement.currentIndex-=1
      goLeft(event.target.parentElement.wrapper)
      
  });
  element.parentElement.rightbtn.addEventListener('click',function(event){
    event.target.parentElement.currentIndex+=1
    goRight(event.target.parentElement.wrapper)
    
});
}
for (var i = 0; i < outerDivs.length; i++) {
  outerDivs[i].append(dotmaker(myDivs[i].imageCount,myDivs[i]))
  outerDivs[i].wrapper=myDivs[i]
 
  
}

window.onload=function(){
 
  for (var i = 0; i < outerDivs.length; i++) { 

    outerDivs[i].currentIndex+=1;
    outerDivs[i].hold=setTimeout(function(){goRight(this.wrapper)}.bind(outerDivs[i]),4000)
  }
}


function goLeft(elem){
  getWidth();
  clearTimer(elem);
 elem.parentElement.timer = setInterval(function() {
    elem.style.left=elem.left+10+'px';
    elem.left=elem.left+10; 
    //reset frame to last image
    if(elem.parentElement.currentIndex<0) {
      elem.parentElement.currentIndex=elem.imageCount-1;
      elem.left=-elem.parentElement.currentIndex*elem.parentElement.containerWidth;
      elem.style.left=elem.left+'px';
      clearInterval(elem.parentElement.timer) 
    }
    // after sliding anim
    else if (elem.left > -elem.parentElement.currentIndex*elem.parentElement.containerWidth-10){
      
      elem.left=-elem.parentElement.currentIndex*elem.parentElement.containerWidth;
      elem.style.left=elem.left+'px';
      clearInterval(elem.parentElement.timer)   
    }
  }, 5);
  elem.parentElement.hold=setTimeout(function(){this.parentElement.currentIndex+=1; goRight(this);}.bind(elem),4000)
  elem.lastActive.classList.remove('active-dot')
  var dotlen=elem.dots.length
  elem.lastActive=elem.dots[(elem.parentElement.currentIndex+dotlen)%dotlen]
  console.log(elem.parentElement.currentIndex)
  elem.lastActive.classList.add('active-dot')
}

function goRight(elem){
 getWidth();
 clearTimer(elem);
 var myindex=elem.parentElement.currentIndex;
  elem.parentElement.timer2 = setInterval(function() {
    elem.style.left=elem.left-10+'px';
    elem.left=elem.left-10; 
    //reset frame to first image
    if(myindex===elem.imageCount) {
      elem.parentElement.currentIndex=0;
      elem.left=0;
      elem.style.left=0;
      clearInterval(elem.parentElement.timer2);
    }
    // after sliding animation
    else if (elem.left < -myindex*elem.parentElement.containerWidth-10){
      
      elem.left=-myindex*elem.parentElement.containerWidth;
      elem.style.left=elem.left+'px';
      clearInterval(elem.parentElement.timer2)   
    }
  }, 5);
  elem.parentElement.hold=setTimeout(function(){this.parentElement.currentIndex+=1; goRight(this);}.bind(elem),4000)
  elem.lastActive.classList.remove('active-dot')
  elem.lastActive=elem.dots[myindex%elem.dots.length]
  console.log(myindex)
  elem.lastActive.classList.add('active-dot')
}
  