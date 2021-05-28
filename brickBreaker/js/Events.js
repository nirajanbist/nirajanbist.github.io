function addWindowEvents(){
    window.addEventListener('mousemove', launcher.holdPosition)
    window.addEventListener('click',launcher.onClick);
    replayButton.addEventListener('click',playCurrentLevel)
    nextStageButton.addEventListener('click', playNextLevel)
}

function removeWindowEvents(){
    window.removeEventListener('mousemove', launcher.holdPosition)
    window.removeEventListener('click',launcher.onClick);
}

function playNextLevel(e){
    if(e) e.stopPropagation();
    if(currentMode=='arcade'){
        previousStageScore = score;
        document.getElementById(currentLevelId).classList.remove('level-active');
        currentGrid.level++;
        currentLevelId =currentGrid.level + 'level';
        var newLevelBtn = document.getElementById(currentLevelId)
        newLevelBtn.classList.add('level-active');
        newLevelBtn.classList.remove('disabled');
        if(currentGrid.level === 1) previousStageScore = 0;
        playCurrentLevel()
    }
    else{
        if(currentGrid.customBricks[Math.abs(currentGrid.level)+1].length>0){
            document.getElementById(currentLevelId).classList.remove('level-active');
            currentGrid.level--;
            currentLevelId =Math.abs(currentGrid.level)+ 'clevel';
            document.getElementById(currentLevelId).classList.add('level-active');
            playCurrentLevel();
        };

    }
}

function playCurrentLevel(e){
    if(e) e.stopPropagation();
    initLevel()
    score = previousStageScore;
    requestAnimationFrame(nextFrame);
}

function playCustomLevel(level){
    
    currentGrid.level = -level;
    score=0;
    initLevel();
    if(clickedonce){
        requestAnimationFrame(nextFrame)
        clickedonce = false;
    }
}