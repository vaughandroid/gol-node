import {Position, Cell, World} from './world'

class Engine {
  currentWorld: World;

  constructor(world: World) {
    this.currentWorld = world;
  }

  nextGeneration() {
    const nextGenerationLiveCellPositions: Position[] = [];
    
    this.currentWorld.activeCellPositions().forEach(pos => {
      const cell = new Cell(this.currentWorld.getCellStatusAt(pos));
      const liveNeighbours = this.currentWorld.countLiveNeighbours(pos);
      if (cell.getNextStatus(liveNeighbours) === 'live') {
        nextGenerationLiveCellPositions.push(pos);
      }
    });

    this.currentWorld = new World(nextGenerationLiveCellPositions);
  }
}

export {Engine, World};
