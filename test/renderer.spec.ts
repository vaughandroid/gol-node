import {expect} from 'chai';
import {World} from '../src/engine';
import {Renderer} from '../src/renderer';

describe('Renderer', () => {
  it('Renders an empty world', () => {
    const renderer = new Renderer();
    const world = new World([]);

    const output = renderer.render(world);

    expect(output).to.equal(
`
...
...
...
`.trim()
    );
  });

  it('Renders a populated world', () => {
    const renderer = new Renderer();
    const world = new World([
      {x: -3, y: -2},
      {x: 4, y: 0},
      {x: 1, y: 1}
    ]);

    const output = renderer.render(world);

    expect(output).to.equal(
`
..........
.x........
..........
........x.
.....x....
..........
`.trim()
    );
  });
});