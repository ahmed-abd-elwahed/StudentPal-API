#!/usr/bin/env node

const { createModel, createController } = require("../utils");
const argv = require("minimist")(process.argv.slice(2));

if (argv.m && argv._) {
  createModel(argv.m, argv._);
}

if (argv.c) {
  createController(argv.c);
}
