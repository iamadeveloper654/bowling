'use strict';

const { scoreValidator } = require('./modules/validator');
const { getBonusArray, getBaseArray } = require('./modules/helper');

/**
 * Returns the score from a bowling match
 * @param {string} scores - Game scores
 */
const scoreGame = scores => {
  scoreValidator(scores);
  // Everything is valid if we get to here.
  let baseArray = getBaseArray(scores);
  let bonusArray = getBonusArray(scores);
  let scoreArray = baseArray.map((frame, index) => {
    return convertToNumbers(frame);
  });
  let bonusScoreArray = bonusArray.map(frame => {
    return frame.toUpperCase() === 'X' ? 10 : frame === '-' ? 0 : frame;
  });
  let numericalArray = [...scoreArray, ...bonusScoreArray];
  let fullArray = [...baseArray, ...bonusArray];

  let calculatedScores = baseArray.map((frame, index) => {
    if (frame[1] === '-') {
      return parseInt(numericalArray[index][0]);
    }
    if (frame[1] === '/') {
      if (fullArray[index + 1].toUpperCase() === 'X') {
        return 10 + parseInt(numericalArray[index + 1]);
      }
      return 10 + parseInt(numericalArray[index + 1][0]);
    }
    if (frame.toUpperCase() === 'X') {
      if (index < 8) {
        if (fullArray[index + 1].toUpperCase() === 'X') {
          if (fullArray[index + 2].toUpperCase() === 'X') {
            return (
              parseInt(numericalArray[index]) +
              parseInt(numericalArray[index + 1]) +
              parseInt(numericalArray[index + 2])
            );
          }
          return (
            parseInt(numericalArray[index]) +
            parseInt(numericalArray[index + 1]) +
            parseInt(numericalArray[index + 2][0])
          );
        }
        return (
          parseInt(numericalArray[index]) +
          parseInt(numericalArray[index + 1][0]) +
          parseInt(numericalArray[index + 1][1])
        );
      }
      if (index === baseArray.length - 2) {
        if (fullArray[index + 1].toUpperCase() === 'X') {
          return (
            parseInt(numericalArray[index]) +
            parseInt(numericalArray[index + 1]) +
            parseInt(numericalArray[index + 2])
          );
        }
        return (
          parseInt(numericalArray[index]) +
          parseInt(numericalArray[index + 1][0]) +
          parseInt(numericalArray[index + 1][1])
        );
      }
      if (index === baseArray.length - 1) {
        return (
          parseInt(numericalArray[index]) +
          parseInt(numericalArray[index + 1]) +
          parseInt(numericalArray[index + 2])
        );
      }
    }
    return parseInt(numericalArray[index][0]) + parseInt(numericalArray[index][1]);
  });

  return calculatedScores.reduce((acc, val) => acc + val);
};

const convertToNumbers = frame => {
  if (frame.toUpperCase() === 'X') {
    return '10';
  }
  if (frame[0] !== '-' && frame[1] !== '-' && frame[1] !== '/') {
    return frame[0] + frame[1];
  }
  if (frame[0] !== '-' && frame[1] === '/') {
    return frame[0] + (10 - parseInt(frame[0]));
  }
  if (frame[0] === '-') {
    return '0' + frame[1];
  }
  return frame[0] + '0';
};

module.exports = {
  scoreGame,
};
