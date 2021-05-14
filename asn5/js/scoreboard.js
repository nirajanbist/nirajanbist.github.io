import gameState from './gameState.js';
import Playground from './playground.js';
import globals from './globals.js';
import gameConfig from './game.config.js';

export default class Scoreboard {
  draw() {
    Playground.playgroundContext.fillStyle = '#fffff';
    Playground.playgroundContext.strokeStyle = '#000000';
    Playground.playgroundContext.font = '35px sans-serif';
    if (gameState.currentState === gameState.playing) {
      Playground.playgroundContext.fillText(
        globals.score,
        gameConfig.canvasWidth / 2,
        40
      );
    }

    if (gameState.currentState === gameState.gameOver) {
      Playground.playgroundContext.font = '25px sans-serif';
      Playground.playgroundContext.fillText(globals.score, 255, 225);
      Playground.playgroundContext.fillText(
        Scoreboard.getHighestScore(),
        255,
        270
      );
    }
  }

  static getHighestScore() {
    let score = Scoreboard.getScores()[0] || 0;
    return score;
  }

  static getScores() {
    const scores = JSON.parse(window.localStorage.getItem('flappyBirdScores'));
    const allNames=this.getNames()
    return scores ? scores.sort((a, b) => b - a) : [];
  }
  
  static getNames() {
    const players = JSON.parse(window.localStorage.getItem('playerNames'));
    return players || [];
  }

  static saveScore() {
    let allScores = Scoreboard.getScores();
    if (!allScores) {
      allScores = [];
    }
    allScores.push(globals.score);
    window.localStorage.setItem('flappyBirdScores', JSON.stringify(allScores));
  }
}
