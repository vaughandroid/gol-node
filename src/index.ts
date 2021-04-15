import yargs = require('yargs');

const argv = yargs.option('difficulty', {
  demandOption: true
}).argv;

const argv2 = yargs.options(
  {'s': { type: 'number', alias: 'seed', describe: 'Random seed', demandOption: false, default: 0 } 
}).argv;

console.log(`World seed: ${argv2.seed}`);
