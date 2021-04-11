// TODO: Can't get this working when I convert to an import as suggested.
const yargs = require('yargs');

const options = yargs
  .option('s', { alias: 'seed', describe: 'Random seed', type: 'integer', demandOption: false, default: 0})
  .argv;

console.log(`World seed: ${options.seed}`);
