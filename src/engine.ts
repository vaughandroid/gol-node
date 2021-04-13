type Live = 'live';
type Dead = 'dead';
type CellStatus = Live | Dead;

class Cell {
  status: CellStatus;
  
  constructor(status: CellStatus) {
    this.status = status;
  }

  getNextStatus(liveNeighbours: number) {
    switch(liveNeighbours) {
      case 2:
        if (this.status === 'live') {
          return 'live';
        } else {
          return 'dead';
        }
      case 3:
        return 'live';
      default:
        return 'dead';
    }
  }
}

interface Position {
  x: number;
  y: number;
}

class World {
  livingCellPositions: Position[];

  constructor(livingCellPositions?: Position[]) {
    this.livingCellPositions = livingCellPositions ?? [];
  }

  getCellStatusAt(pos: Position): CellStatus {
    this.livingCellPositions.forEach(lcPos => {
      if (lcPos.x === pos.x && lcPos.y === pos.y) return 'live';
    })
    return 'dead';
  }

  activeCellPositions(): Position[] {
    const activePositions: Position[] = [];
    this.livingCellPositions.forEach(pos => {
      addIfNotPresent(
        activePositions,
        {x: pos.x-1, y: pos.y-1}, {x: pos.x, y: pos.y-1}, {x: pos.x+1, y: pos.y-1},
        {x: pos.x-1, y: pos.y}, {x: pos.x, y: pos.y}, {x: pos.x+1, y: pos.y},
        {x: pos.x-1, y: pos.y+1}, {x: pos.x, y: pos.y+1}, {x: pos.x+1, y: pos.y+1},
      );
    });
    return activePositions;
  }
}

function addIfNotPresent(array: Position[], ...positions: Position[]) {
  positions.forEach(pos => {
    if (!array.some(it => (it.x === pos.x && it.y === pos.y))) {
      array.push(pos);
    }
  });
}

class Engine {
  currentWorld: World;

  constructor(world: World) {
    this.currentWorld = world;
  }

  nextGeneration() {
  }
}

export {Position, Cell, World, Engine};
