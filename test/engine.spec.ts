import {expect} from 'chai';
import {Engine} from '../src/engine';
import {Position, World} from '../src/world';

describe('Engine', () => {
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
    it('"Blinker"', () => {
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

    it('"Toad"', () => {
      const blockPositionsA: Position[] = [
        {x:1, y:0}, {x:2, y:0}, {x:3, y:0},
        {x:0, y:1}, {x:1, y:1}, {x:2, y:1},
      ];
      const blockPositionsB: Position[] = [
        {x:2, y:-1},
        {x:0, y:0}, {x:3, y:0},
        {x:0, y:1}, {x:3, y:1},
        {x:1, y:2}
      ];

      const engine = new Engine(new World(blockPositionsA));

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members(blockPositionsB);

      engine.nextGeneration();

      expect(engine.currentWorld.livingCellPositions).to.have.deep.members(blockPositionsA);
    });
  });
});