#!/usr/bin/env node

var fs = require('fs');
var bl = require('bl');
var args = require('optimist')
.demand(1)
.usage("Usage: $0 <module-name>")
.argv;

var modname = args._[0];

var input = args.input ? fs.createReadStream(args.input) : process.stdin;
input.pipe(bl(function(err, data) {
    if (err) throw err;
    var processed = data.toString().split(/[\r\n]+/)
    .map(function(line) { return line.replace(/^export declare/, 'export'); })
    .join('\n');
    process.stdout.write('declare module "' + process.argv[process.argv.length - 1] + '" {\n')
    process.stdout.write(processed);
    process.stdout.write('}\n');
}));
