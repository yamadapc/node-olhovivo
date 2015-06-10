'use strict';
var child_process = require('child_process');
var jsfmt = require('jsfmt');
var _ = require('lodash');

function main() {
  var testout = child_process.execSync('npm run dev-test').toString();
  var parsed = _(testout.toString().split('<<<<<<-- cut here -->>>>>>'))
    .map(function(item, i) {
      if(i % 2 === 0) return;
      return item;
    })
    .compact()
    .map(function(item) {
      return _.trim(item, "\n\t ");
    })
    .value();

  var config = jsfmt.getConfig();
  _.each(parsed, function(item) {
    console.log(jsfmt.format(item, config));
    console.log();
  });
}

main();
