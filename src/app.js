'use strict';

const { scoreValidator } = require('./modules/validator');
const {
  getBonusArray,
  getBaseArray,
  isStrike,
  getNextScore,
  getLastScore,
  convertToNumbers,
} = require('./modules/helper');

/**
 * Returns the score from a bowling match
 * @param {string} scoreboard - Game scores
 */
const scoreGame = scoreboard => {
  scoreValidator(scoreboard);
  // Everything is valid if we get to here.
  let gameArray = getBaseArray(scoreboard);
  let bonusArray = getBonusArray(scoreboard);
  let scores = [
    ...gameArray.map((frame, index) => convertToNumbers(frame)),
    ...bonusArray.map(frame => (frame.toUpperCase() === 'X' ? 10 : frame === '-' ? 0 : frame)),
  ];
  let gameWithBonus = [...gameArray, ...bonusArray];

  let calculatedScores = gameArray.map((frame, index) => {
    // If the second ball is a miss
    if (frame[1] === '-') {
      return parseInt(scores[index][0]);
    }
    // If the frame is a spare
    if (frame[1] === '/') {
      if (isStrike(gameWithBonus, index, 1)) {
        return 10 + parseInt(scores[index + 1]);
      }
      return 10 + parseInt(scores[index + 1][0]);
    }
    // If the frame is a strike
    if (frame.toUpperCase() === 'X') {
      return (
        parseInt(scores[index]) +
        getNextScore(gameArray.length, gameWithBonus, scores, index) +
        getLastScore(gameArray.length, gameWithBonus, scores, index)
      );
    }
    // If the frame consists only of numbers or the second ball was a miss
    return parseInt(scores[index][0]) + parseInt(scores[index][1]);
  });

  return calculatedScores.reduce((acc, val) => acc + val);
};

module.exports = {
  scoreGame,
};
