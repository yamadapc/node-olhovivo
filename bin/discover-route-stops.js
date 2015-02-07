'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var OlhoVivoApi = require('..');
var discovery = require('../lib/discovery');

var routeStopsStream = new discovery.RouteStopsStream({
  olhovivoApi: new OlhoVivoApi({ token: process.env.SPTRANS_TOKEN }),
});

function getStats(s) {
  return {
    npending: _.size(s._pendingRoutes),
    ndone: _.size(s._doneRoutes),
    nerrored: _.size(s._erroredRoutes),
    nidle: _.size(s._idleRoutes),
  };
}

routeStopsStream.on('http', function(stop_id) {
  console.error('HTTP ' + stop_id);
});

routeStopsStream.on('data', function(stop) {
  addStop(stop);
  var stats = getStats(routeStopsStream);
  console.error(
    'Pending: ' + stats.npending + '\n' +
    'Done: ' + stats.ndone + '\n' +
    'Errored: ' + stats.nerrored + '\n' +
    'Idle: ' + stats.nidle
  );
});

var knownStops = {};
function addStop(stop) {
  if(knownStops[stop.CodigoParada]) {
    knownStops[stop.CodigoParada].route_ids.push(stop.route_id);
  } else {
    knownStops[stop.CodigoParada] = _.omit(stop, 'route_id');
    knownStops[stop.CodigoParada].route_ids = [stop.route_id];
  }
}

routeStopsStream.on('end', function() {
  fs.writeFileSync(
    path.join(__dirname, 'output.json'),
    JSON.stringify(_.values(knownStops))
  );
});
