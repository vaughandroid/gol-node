import {World} from './engine';

class Renderer {
  render(world: World): string {
    const bounds = world.getBounds();
    let output = "";
    for (let y = bounds.top-1; y <= bounds.bottom+1; y++) {
      for (let x = bounds.left-1; x <= bounds.right+1; x++) {
        if (world.getCellStatusAt({x: x, y: y}) === 'live') {
          output += "x";
        } else {
          output += ".";
        }
      }
      output += "\n";
    }
    return output.trimEnd();
  }
}

export {Renderer};
