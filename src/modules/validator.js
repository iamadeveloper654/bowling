'use strict';

const { getBaseFrames, getBonusFrames } = require('./helper');

module.exports = {
  /**
   * Validates that the string is valid
   * @param {string} scores - Game scores
   */
  scoreValidator(scores) {
    if (typeof scores !== 'string') {
      throw new Error('Scores parameter must be a string');
    }

    let normalGame = getBaseFrames(scores);
    let bonusGame = getBonusFrames(scores);

    let lastGamePoint = normalGame[normalGame.length - 1];

    if (!(scores.split('||').length > 1)) {
      throw new Error('Scores parameter must end with a double pipe');
    }
    if (normalGame.split('|').length !== 10) {
      throw new Error('Scores parameter must have exactly 10 frames, not including bonus rounds');
    }
    let invalidBonusSpare = bonusGame.length > 0 && !/[x\/]+/gi.test(lastGamePoint);
    let invalidBonusStrike = bonusGame.length > 1 && !/x+/gi.test(lastGamePoint);

    if (invalidBonusSpare || invalidBonusStrike || bonusGame.length > 2) {
      throw new Error('A bonus game has been provided when it shouldnt have been');
    }
    module.exports.framesValidator(scores.split('||')[0].split('|'));
  },

  /**
   * Loops through each frame and ensures it is valid.
   * @param {array} arrayOfFrames - An array of frames. One index for each frame.
   */
  framesValidator(arrayOfFrames) {
    if (!Array.isArray(arrayOfFrames)) {
      throw new Error('framesValidator only accepts an array of frames');
    }

    arrayOfFrames.forEach(frame => {
      if (frame.length > 2) {
        throw new Error('A frame can only contain a maximum of two balls');
      }
      if (frame[0].toUpperCase() === 'X') {
        if (frame.length > 1) {
          throw new Error('Frame must only have 1 character if registered as a strike');
        }
        return true;
      }
      if (!(frame, /^[0-9-]+[0-9\-\/]+/gi.test(frame))) {
        throw new Error('Frame must only contain valid characters');
      }
    });
  },
};
