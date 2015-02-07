'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var OlhoVivoApi = require('..');
var LinesStream = require('../lib/discovery/lines-stream').LinesStream;

var linesStream = new LinesStream({
  olhovivoApi: new OlhoVivoApi({ token: process.env.SPTRANS_TOKEN }),
});

function getStats(s) {
  return {
    npending: _.size(s._pendingStops),
    ndone: _.size(s._doneStops),
    nerrored: _.size(s._erroredStops),
    nidle: _.size(s._idleStops),
  };
}

linesStream.on('http', function(stop_id) {
  console.error('HTTP ' + stop_id);
});

linesStream.on('data', function(line) {
  addLine(line);
  var stats = getStats(linesStream);
  console.error(
    'Pending: ' + stats.npending + '\n' +
    'Done: ' + stats.ndone + '\n' +
    'Errored: ' + stats.nerrored + '\n' +
    'Idle: ' + stats.nidle
  );
});

var knownLines = {};
function addLine(line) {
  if(knownLines[line.line_id]) {
    knownLines[line.line_id].stop_ids.push(line.stop_id);
  } else {
    knownLines[line.line_id] = _.omit(line, 'stop_id');
    knownLines[line.line_id].stop_ids = [line.stop_id];
  }
}

linesStream.on('end', function() {
  fs.writeFileSync(
    path.join(__dirname, 'output.json'),
    JSON.stringify(_.values(knownLines))
  )
});
