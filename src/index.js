#!/usr/bin/env node

const yargs = require('yargs');

const options = yargs
  .option('s', { alias: 'seed', describe: 'Random seed', type: 'integer', demandOption: false, default: 0})
  .argv;

console.log(`World seed: ${options.seed}`);
