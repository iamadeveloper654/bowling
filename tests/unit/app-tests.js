'use strict';

const { assert } = require('chai');

const app = require('../../src/app');

describe('App Tests', () => {
  describe('Bowling Tests', () => {
    describe('Validation Tests', () => {
      [1, [], {}, true, undefined, null].forEach(type => {
        it(`Should throw an error if a non string (${type}) is passed`, done => {
          assert.throws(() => {
            app.scoreGame(type);
          }, 'Scores parameter must be a string');
          done();
        });
      });
      it('Should throw an error if a bonus round is not defined', done => {
        assert.throws(() => {
          app.scoreGame('91|92|9-|94|9-|95|9-|9-5|9-|9-|');
        }, 'Scores parameter must end with a double pipe');
        done();
      });

      it('Should throw an error if there is more than 10 frames', done => {
        assert.throws(() => {
          app.scoreGame('9-|9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||');
        }, 'Scores parameter must have exactly 10 frames, not including bonus rounds');
        done();
      });

      it('Should throw an error if there is less than 10 frames', done => {
        assert.throws(() => {
          app.scoreGame('9-|9-|9-|9-|9-|9-|9-|9-|9-||');
        }, 'Scores parameter must have exactly 10 frames, not including bonus rounds');
        done();
      });

      it('Should throw an error if a frame contains more than 1 character for a strike ', done => {
        assert.throws(() => {
          app.scoreGame('X1|X|X|X|X|X|X|X|X|X||XX');
        }, 'Frame must only have 1 character if registered as a strike');
        done();
      });

      ['@', '£', '$', '&', '*', '+', '.', '?', '!', '\\'].forEach(character => {
        it(`Should throw an error if a frame contains non-valid character ${character}`, done => {
          assert.throws(() => {
            app.scoreGame(`9${character}|9-|9-|9-|9-|9-|9-|9-|9-|9-||`);
          }, 'Frame must only contain valid characters');
          done();
        });
      });

      it('Should throw an error if a frame contains a bonus ball without a spare or strike', done => {
        assert.throws(() => {
          app.scoreGame(`9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||9`);
        }, 'A bonus game has been provided when it shouldnt have been');
        done();
      });

      it('Should throw an error if a frame contains two bonus balls without a strike', done => {
        assert.throws(() => {
          app.scoreGame(`9-|9-|9-|9-|9-|9-|9-|9-|9-|9/||9-`);
        }, 'A bonus game has been provided when it shouldnt have been');
        done();
      });

      it('Should throw an error if a frame contains more than two balls', done => {
        assert.throws(() => {
          app.scoreGame('81|81|81|818|8-|81|81|81|81|81||');
        }, 'A frame can only contain a maximum of two balls');
        done();
      });

      it('Should throw an error if bonus frame contains more than two balls', done => {
        assert.throws(() => {
          app.scoreGame(`9-|9-|9-|9-|9-|9-|9-|9-|9-|X||XXX`);
        }, 'A bonus game has been provided when it shouldnt have been');
        done();
      });
    }); // End of Validation Tests
    describe('Score Tests', () => {
      it('Should return a score of 300', done => {
        assert.equal(app.scoreGame('X|X|X|X|X|X|X|X|X|X||XX'), 300);
        done();
      });
      it('Should return a score of 88', done => {
        assert.equal(app.scoreGame('9-|9-|9-|9-|7-|9-|9-|9-|9-|9-||'), 88);
        done();
      });
      it('Should return a score of 90', done => {
        assert.equal(app.scoreGame('9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||'), 90);
        done();
      });
      it('Should return a score of 89', done => {
        assert.equal(app.scoreGame('81|81|81|81|8-|81|81|81|81|81||'), 89);
        done();
      });
      it('Should return a score of 88', done => {
        assert.equal(app.scoreGame('81|81|81|81|-7|81|81|81|81|81||'), 88);
        done();
      });
      it('Should return a score of 82', done => {
        assert.equal(app.scoreGame('1-|81|81|81|-9|81|81|81|81|81||'), 82);
        done();
      });
      it('Should return a score of 150', done => {
        assert.equal(app.scoreGame('5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5'), 150);
        done();
      });
      it('Should return a score of 167', done => {
        assert.equal(app.scoreGame('X|7/|9-|X|-8|8/|-6|X|X|X||81'), 167);
        done();
      });
    }); // End of Score Tests
  }); // End of Bowling Tests
}); // End of App Tests
