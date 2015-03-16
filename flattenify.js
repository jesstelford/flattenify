var browserify = require('browserify');
var npmInstall = require('./npmInstall');
var path = require('path');
var brfs = require('brfs');
var fs = require('fs');

module.exports = function(moduleName, outfile, verbose, pathName, otherArgs) {

  npmInstall(moduleName, pathName, verbose && outfile, function(err) {

    if (err) {
      return console.error(err);
    }

    var moduleDir = path.resolve(pathName, 'node_modules', moduleName);
    var moduleEntryFile = require.resolve(moduleDir);

    var b = browserify({
      entries: [moduleEntryFile],
      standalone: 'flattenify_' + moduleName,
      basedir: moduleDir,
      builtins: [],
      commondir: false,
      detectGlobals: false
      // insertGlobalVars: {
      //   _process: undefined
      //   // global: undefined,
      //   // Buffer: undefined
      // }
    });

    b.transform(brfs);

    b.on('bundle', function (bundle) {

      if (err) {
        return console.error(err);
      }

      bundle.on('finish', function() {
        if (outfile) {
          console.log("Module '" + moduleName + "' bundled into " + path.resolve(outfile));
        }
      });

      var outStream = outfile ? fs.createWriteStream(path.resolve(outfile)) : process.stdout;

      bundle.pipe(outStream);

    })

    b.bundle()

  });

}
