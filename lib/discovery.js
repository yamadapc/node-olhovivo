'use strict';
var fs = require('fs');
var streams = require('stream');
var util = require('util');
var Promise = require('bluebird');
var _ = require('lodash');

var OlhoVivoApi = require('..');

var Readable = streams.Readable;

Promise.promisifyAll(fs);

var routes = exports.routes = require('../data/routes.json');
exports.stops = require('../data/stops.json');

var DEFAULT_ROUTE_STOPS_OPTIONS = {
  nretries: 5,
};

function RouteStopsStream(options) {
  Readable.call(this, {
    objectMode: true,
  });

  if(!options && options.olhovivoApi) {
    throw new Error('Missing required option `olhovivoApi`');
  }
  _.defaults(options, DEFAULT_ROUTE_STOPS_OPTIONS);

  this.olhovivoApi = options.olhovivoApi;
  this.nretries = options.nretries;
  this._results = [];

  this._doneRoutes = {};
  this._erroredRoutes = {};
  this._pendingRoutes = {};
  this._idleRoutes = _.reduce(routes, function(m, route) {
    m[route.id] = route;
    return m;
  }, {});
}
util.inherits(RouteStopsStream, Readable);

RouteStopsStream.prototype._read = function(n) {
  if(_.isEmpty(this._idleRoutes)) {
    if(_.isEmpty(this._pendingRoutes)) {
      return this.push(null);
    }
    return;
  }

  for(var i = 0; i < n; i++) {
    var route_id = this._routeFromQueue().route_id;
    this._processRoute(route_id);
  }
};

RouteStopsStream.prototype._processRoute = function(route_id) {
  var _this = this;

  return this.olhovivoApi.queryStops(route_id)
    .then(function(stops) {
      _this._setState(route_id, 'done');
      return _.map(stops, function(stop) {
        _this.push(stop);
      });
    })
    .catch(this._setState.bind(this, route_id, 'errored'));
};

RouteStopsStream.prototype._setState = function(route_id, st, err) {
  var targetRoute;

  switch(st) {
    case 'done':
      targetRoute = this._pendingRoutes[route_id];
      delete this._pendingRoutes[route_id];
      this._doneRoutes[route_id] = targetRoute;
      break;
    case 'pending':
      targetRoute = this._idleRoutes[route_id];
      delete this._idleRoutes[route_id];
      this._pendingRoutes[route_id] = targetRoute;
      break;
    case 'errored':
      targetRoute = this._pendingRoutes[route_id];
      if(!targetRoute) {
        return;
      }

      if(targetRoute.nretries < this.nretries) {
        targetRoute.nretries++;
        this._processRoute(route_id);
      } else {
        delete this._pendingRoutes[route_id];
        targetRoute.error = err;
        this._erroredRoutes[route_id] = targetRoute;
      }
      break;
    default:
      this._idleRoutes[route_id] =
        this._pendingRoutes[route_id] ||
        this._erroredRoutes[route_id] ||
        this._doneRoutes[route_id] ||
        this._idleRoutes[route_id];
      break;
  }
};

RouteStopsStream.prototype._routeFromQueue = function() {
  var randomRoute = _(this._idleRoutes).values().sample();
  delete this._idleRoutes[randomRoute.route_id];
  this._pendingRoutes[randomRoute.route_id] = randomRoute;
  return randomRoute;
};

var routeStopsStream = new RouteStopsStream({
  olhovivoApi: new OlhoVivoApi({ token: process.env.SPTRANS_TOKEN }),
});

routeStopsStream.on('data', function(stop) {
  console.log(JSON.stringify(stop, null, 2));
});
