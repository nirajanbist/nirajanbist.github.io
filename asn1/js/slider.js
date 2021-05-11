var myDivs = document.getElementsByClassName("carousel-image-wrapper");
var outerDivs = document.getElementsByClassName("carousel-container");
console.log(myDivs)
var timer;
var currentIndex=0;
function leftrightButtons(elem){
  elem.leftbtn = document.createElement('div');
  elem.rightbtn=document.createElement('div');
  elem.leftbtn.classList.add('lbtn')
  elem.rightbtn.classList.add('rbtn')
  // elem.leftbtn.addEventListener('click',function(e){
  //   currentIndex-=1
  //   console.log(elem.childNodes[0])
  // })
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
    if (i===0){ parent.lastActive=dot; dot.classList.add('active-dot')}
    dot.addEventListener('click',function(e){
      parent.left=-e.target.index*1000
      parent.style.left=-e.target.index*1000+'px'
      e.target.classList.add('active-dot')
      parent.lastActive.classList.remove('active-dot')
      parent.lastActive=e.target
      

    })
    this.elem.appendChild(dot)
  }
  return this.elem;
}
for (var i = 0; i < outerDivs.length; i++) {
  leftrightButtons(outerDivs[i])
}
for (var i = 0; i < myDivs.length; i++) {
  var element = myDivs[i];
  element.imageCount=element.childElementCount;
  element.left=0;
  element.parentElement.leftbtn.addEventListener('click',function(event){
      currentIndex-=1
      goLeft(element)
      
  });
  element.parentElement.rightbtn.addEventListener('click',function(event){
    currentIndex+=1
    goRight(element)
    
});
}
for (var i = 0; i < outerDivs.length; i++) {
  outerDivs[i].append(dotmaker(myDivs[i].imageCount,myDivs[i]))
  
  
}
function goLeft(elem){
  elem.lastActive=parent.dots[currentIndex]
  elem.lastActive.classList.remove('active-dot')
  timer = setInterval(function() {
    elem.style.left=elem.left+10+'px';
    elem.left=elem.left+10; 
    //reset frame to last image
    if(currentIndex<0) {
      currentIndex=elem.imageCount-1;
      elem.left=-currentIndex*1000;
      elem.style.left=elem.left+'px';
      clearInterval(timer) 
    }
    // after sliding anim
    else if (elem.left > -currentIndex*1000-10){
      
      elem.left=-currentIndex*1000;
      elem.style.left=elem.left+'px';
      clearInterval(timer)   
    }
  }, 5);

}

function goRight(elem){
  timer = setInterval(function() {
    elem.style.left=elem.left-10+'px';
    elem.left=elem.left-10; 
    //reset frame to first image
    if(currentIndex===elem.imageCount) {
      currentIndex=0;
      elem.left=0;
      elem.style.left=0;
      clearInterval(timer);
    }
    // after sliding animation
    else if (elem.left < -currentIndex*1000-10){
      
      elem.left=-currentIndex*1000;
      elem.style.left=elem.left+'px';
      clearInterval(timer)   
    }
  }, 5);
}
  