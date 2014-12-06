# flattenify
[![NPM](https://nodei.co/npm/flattenify.png)](https://nodei.co/npm/flattenify/)

Flatten any npm module into a single, require'able bundle.

## Installation

```bash
$ npm install -g flattenify
```

## Usage

```
Usage: flattenify <module> [options]

Options:

  -h, --help            output usage information
  -V, --version         output the version number
  -o, --outfile <file>  Write flattened bundle to this file. If unspecified, prints to stdout
  --verbose             Output more messages during operation
```

## Example

To flatten the `[hashish](https://github.com/substack/node-hashish)` module into a single file bundle:

```bash
$ flattenify hashish --outfile ./hashish.js
```

Then, require it like any local module file (example from
`[hashish](https://github.com/substack/node-hashish)` docs):

```javascript
var Hash = require('./hashish.js');

Hash({ a : 1, b : 2, c : 3, d : 4 })
    .map(function (x) { return x * 10 })
    .filter(function (x) { return x < 30 })
    .forEach(function (x, key) {
        console.log(key + ' => ' + x);
    })
;
```

## How it works

Flattenify installs the requested module into a temporary directory (which is
later cleaned up) with npm. Browserify is then invoked with a special
incantation that generates the final node-compaitble module, saved into
`outfile`.
