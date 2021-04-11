import {expect} from 'chai';
import {Cell} from '../src/engine';

describe('Engine', () => {
  describe('Cell', () => {
    describe('Live', () => {
      it('Should live on if it has 2 or 3 live neighbors', () => {
        let cell = new Cell('live');

        let result2 = cell.getNextStatus(2);
        let result3 = cell.getNextStatus(3);

        expect(result2).to.equal('live');
        expect(result3).to.equal('live');
      });
      
      it('Should die if it has 0-1 or 4 - 8 live neighbors', () => {
        let cell = new Cell('live');

        let result0 = cell.getNextStatus(0);
        let result1 = cell.getNextStatus(1);

        let result4 = cell.getNextStatus(4);
        let result5 = cell.getNextStatus(5);
        let result6 = cell.getNextStatus(6);
        let result7 = cell.getNextStatus(7);
        let result8 = cell.getNextStatus(8);

        expect(result0).to.equal('dead');
        expect(result1).to.equal('dead');

        expect(result4).to.equal('dead');
        expect(result5).to.equal('dead');
        expect(result6).to.equal('dead');
        expect(result7).to.equal('dead');
        expect(result8).to.equal('dead');
      });
    });

    describe('Dead', () => {
      it('Should come alive if it has 3 live neighbors', () => {
        let cell = new Cell('live');

        let result3 = cell.getNextStatus(3);

        expect(result3).to.equal('live');
      });

      it('Should stay dead if it has 0-2 or 4-8 live neighbors', () => {
        let cell = new Cell('dead');

        let result0 = cell.getNextStatus(0);
        let result1 = cell.getNextStatus(1);
        let result2 = cell.getNextStatus(2);

        let result4 = cell.getNextStatus(4);
        let result5 = cell.getNextStatus(5);
        let result6 = cell.getNextStatus(6);
        let result7 = cell.getNextStatus(7);
        let result8 = cell.getNextStatus(8);

        expect(result0).to.equal('dead');
        expect(result1).to.equal('dead');
        expect(result2).to.equal('dead');

        expect(result4).to.equal('dead');
        expect(result5).to.equal('dead');
        expect(result6).to.equal('dead');
        expect(result7).to.equal('dead');
        expect(result8).to.equal('dead');
      });
    });
  });
});