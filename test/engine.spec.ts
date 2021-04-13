import {expect} from 'chai';
import {Position, Cell, World, Engine} from '../src/engine';

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

describe('World', () => {
  describe('Active cells', () => {
    it('Should treat a live cell and all its neighbours as active', () => {
      const world = new World([{x: 0, y: 0}]);

      const expectedActiveCells = [
        {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
        {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0},
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1},
      ];

      expect(world.activeCellPositions()).to.have.deep.members(expectedActiveCells)
    });

    it('Should support adjacent live cells', () => {
      const world = new World([
        {x: 0, y: 0}, {x: 1, y: 0},
        {x: 0, y: 1}, {x: 1, y: 1},
      ]);

      const expectedActiveCells = [
        {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 2, y: -1},
        {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0},
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},
        {x: -1, y: 2}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2},
      ];

      expect(world.activeCellPositions()).to.have.deep.members(expectedActiveCells)
    });

    it('Should support near non-adjacent live cells', () => {
      const world = new World([
        {x: 0, y: 0}, {x: 2, y: 0},
        {x: 0, y: 2}, {x: 2, y: 2},
      ]);

      const expectedActiveCells = [
        {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 2, y: -1}, {x: 3, y: -1},
        {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
        {x: -1, y: 2}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2},
        {x: -1, y: 3}, {x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3},
      ];

      expect(world.activeCellPositions()).to.have.deep.members(expectedActiveCells)
    });

    it('Should support distant non-adjacent live cells', () => {
      const world = new World([
        {x: 0, y: 0}, 
        {x: 10, y: 10},
      ]);

      const expectedActiveCells = [
        {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
        {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0},
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1},
        
        {x: 9, y: 9}, {x: 10, y: 9}, {x: 11, y: 9},
        {x: 9, y: 10}, {x: 10, y: 10}, {x: 11, y: 10},
        {x: 9, y: 11}, {x: 10, y: 11}, {x: 11, y: 11},
      ];

      expect(world.activeCellPositions()).to.have.deep.members(expectedActiveCells)
    });
  });
});

describe.skip('Engine', () => {
  describe('Still lifes', () => {
    it('An empty world should not change', () => {
      const engine = new Engine(new World([]));

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members([]);
    });

    it('"Block" arrangements should not change', () => {
      const blockPositions: Position[] = [
        {x:0, y:0}, {x:0, y:1},
        {x:1, y:0}, {x:1, y:1},
      ];

      const engine = new Engine(new World(blockPositions));

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members(blockPositions);
    });
  });

  describe('Oscillators', () => {
    it('"Blinker" arrangements should have period 2', () => {
      const blockPositionsA: Position[] = [
        {x:0, y:0},
        {x:0, y:1},
        {x:0, y:2},
      ];
      const blockPositionsB: Position[] = [
        {x:-1, y:1}, {x:0, y:1}, {x:1, y:1},
      ];

      const engine = new Engine(new World(blockPositionsA));

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members(blockPositionsB);

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members(blockPositionsA);
    });
  });
});