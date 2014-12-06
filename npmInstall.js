var spawn = require('child_process').spawn;

module.exports = function(moduleName, cwd, verbose, cb) {

  var spawnOpts = {
    cwd: cwd
  };

  if (verbose) {
    spawnOpts.stdio = [process.stdin, process.stdout, process.stderr]
  } else {
    spawnOpts.stdio = ['ignore', 'ignore', process.stderr]
  }

  var child = spawn('npm', ['install', moduleName, '--save'], spawnOpts);

  var childIsAlive = true;

  child.on('error', function(err) {

    if (childIsAlive) {
      child.kill();
      childIsAlive = false;
    }

    cb(err);

  });

  child.on('exit', function(exitCode, signal) {

    childIsAlive = false;

    if (exitCode !== 0) {
      return cb(new Error('npm exited with code ' + exitCode));
    }

    cb(null);

  });
}
