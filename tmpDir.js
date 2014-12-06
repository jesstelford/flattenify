var tmp = require('tmp');

module.exports = function(cb) {

  // No matter what, clean up after we exit
  tmp.setGracefulCleanup();

  tmp.dir(
    {
      // rm -rf of temp directory
      unsafeCleanup: true
    },
    cb
  );

}
