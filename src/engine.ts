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

export {Cell};
