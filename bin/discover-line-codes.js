'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var ProgressBar = require('progress');
var OlhoVivoApi = require('..');
var LinesStream = require('../lib/discovery/lines-stream').LinesStream;
var stops = require('../lib/discovery/lines-stream').stops;

var linesStream = new LinesStream({
  olhovivoApi: new OlhoVivoApi({ token: process.env.SPTRANS_TOKEN }),
});

var bar = new ProgressBar('[:bar] :percent :eta :elapsed (:current/:total)', {
  total: _.size(stops),
});

function getStats(s) {
  return {
    npending: _.size(s._pendingStops),
    ndone: _.size(s._doneStops),
    nerrored: _.size(s._erroredStops),
    nidle: _.size(s._idleStops),
  };
}

linesStream.on('http', function() {
  var stats = getStats(linesStream);
  console.error(
    'Pending: ' + stats.npending + '\n' +
    'Done: ' + stats.ndone + '\n' +
    'Errored: ' + stats.nerrored + '\n' +
    'Idle: ' + stats.nidle
  );
  bar.tick();
});

linesStream.on('data', function(line) {
  addLine(line);
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
    path.join(__dirname, 'errors.json'),
    JSON.stringify(_.values(linesStream._erroredStops))
  );
  fs.writeFileSync(
    path.join(__dirname, 'output.json'),
    JSON.stringify(_.values(knownLines))
  );
});
