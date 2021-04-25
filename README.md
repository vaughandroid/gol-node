# Game of Life in node.js

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) implemented in node.js and typescript.

## Usage

Run with: `npm start`

## Controls

* Esc/Q/Ctrl+C to quit.
* Space to advance the generation.

## Conway's GOL Rules

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.