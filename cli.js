#!/usr/bin/env node

var flattenify = require('./flattenify');
var cliArgs = require('./cliArgs');
var tmpDir = require('./tmpDir');

options = cliArgs();
tmpDir(function _tempDirCreated(err, path) {
  if (err) {
    console.error(err);
  }

  flattenify(options.args[0], options.outfile, options.verbose, path);

});
