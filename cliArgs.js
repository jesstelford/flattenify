var packageJson = require('./package.json');
var commander = require('commander');

module.exports = function() {

  commander
    .version(packageJson.version)
    .usage('<module> [options]')
    .description(packageJson.description)
    .option('-o, --outfile <file>', 'Write flattened bundle to this file. If unspecified, prints to stdout')
    .option('--verbose', 'Output more messages during operation. Only when --outfile is set')
    .parse(process.argv);

  // Module name is required
  if (commander.args.length !== 1) {
    commander.help();
  }

  return commander;

}
