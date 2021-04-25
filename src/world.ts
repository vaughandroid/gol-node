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

interface Bounds {
  left: number,
  right: number,
  top: number,
  bottom: number
}

class World {
  livingCellPositions: Position[];

  constructor(livingCellPositions?: Position[]) {
    this.livingCellPositions = livingCellPositions ?? [];
  }

  getCellStatusAt(pos: Position): CellStatus {
    const isLive = this.livingCellPositions.some(lcPos => (lcPos.x === pos.x && lcPos.y === pos.y));
    if (isLive) { return 'live' } else { return 'dead';}
  }

  countLiveNeighbours(pos: Position): number {
    return [
      {x: pos.x-1, y: pos.y-1}, {x: pos.x, y: pos.y-1}, {x: pos.x+1, y: pos.y-1},
      {x: pos.x-1, y: pos.y}, {x: pos.x+1, y: pos.y},
      {x: pos.x-1, y: pos.y+1}, {x: pos.x, y: pos.y+1}, {x: pos.x+1, y: pos.y+1},
    ]
      .filter(it => this.getCellStatusAt(it) === 'live')
      .length
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

  getBounds(): Bounds {
    const defaultBounds: Bounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };

    const calculatedBounds: Bounds | null = this.livingCellPositions.reduce(
      (bounds: Bounds | null, pos: Position) => {
        if (bounds !== null) {
          bounds.left = Math.min(bounds.left, pos.x);
          bounds.right = Math.max(bounds.right, pos.x);
          bounds.top = Math.min(bounds.top, pos.y);
          bounds.bottom = Math.max(bounds.bottom, pos.y);
          return bounds;
        } else {
          return {
            left: pos.x,
            right: pos.x,
            top: pos.y,
            bottom: pos.y
          };
        }
      },
      null
    );

    return calculatedBounds ?? defaultBounds;
  }
}

function addIfNotPresent(array: Position[], ...positions: Position[]) {
  positions.forEach(pos => {
    if (!array.some(it => (it.x === pos.x && it.y === pos.y))) {
      array.push(pos);
    }
  });
}

export {Position, Bounds, Cell, World};
