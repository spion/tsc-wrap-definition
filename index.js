#!/usr/bin/env node

var bl = require('bl');
var args = require('optimist')
.demand(1)
.usage("Usage: $0 <module-name>")
.argv;

var modname = args._[0];

process.stdin.pipe(bl(function(err, data) {
    if (err) throw err;
    process.stdout.write('declare module "' + process.argv[process.argv.length - 1] + '" {\n')
    process.stdout.write(data);
    process.stdout.write('}\n');
}));
