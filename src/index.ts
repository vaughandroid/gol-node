import blessed = require('blessed');
import {Position, World} from './world';
import {Renderer} from './renderer';
import { Engine } from './engine';

const engine = new Engine(createWorld());
const renderer = new Renderer();

const screen = blessed.screen({fastCSR: true});
screen.title = `Conway's Game of Life`;

var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: '#ff00ff',
    border: {
      fg: '#f0f0f0'
    }
  }
});

screen.append(box);

renderScreen();

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));
// Next generation on space.
screen.key(['space'], (ch, key) => {
  engine.nextGeneration();
  renderScreen();
});


function createWorld(): World {
  // TEMP - hardcode to blinker
  const blinkerPositions: Position[] = [
    {x:0, y:0},
    {x:0, y:1},
    {x:0, y:2},
  ];

  return new World(blinkerPositions);
}

function renderScreen() {
  box.content = renderer.render(engine.currentWorld);
  screen.render();
}