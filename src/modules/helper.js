'use strict';

module.exports = {
  getBaseFrames(scores) {
    return scores.split('||')[0];
  },
  getBonusFrames(scores) {
    return scores.split('||')[1];
  },
  getBonusArray(scores) {
    return scores.split('||')[1].split('');
  },
  getBaseArray(scores) {
    return scores.split('||')[0].split('|');
  },
  isStrike(game, index, indexBump) {
    return game[index + indexBump].toUpperCase() === 'X';
  },
  getNextScore(arrayLength, game, scores, index) {
    return module.exports.isStrike(game, index, 1) || index === arrayLength - 1
      ? parseInt(scores[index + 1])
      : parseInt(scores[index + 1][0]);
  },
  getLastScore(arrayLength, game, scores, index) {
    return !module.exports.isStrike(game, index, 1) && index !== arrayLength - 1
      ? parseInt(scores[index + 1][1])
      : !module.exports.isStrike(game, index, 2)
        ? parseInt(scores[index + 2][0])
        : parseInt(scores[index + 2]);
  },
  convertToNumbers(frame) {
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
  },
};
