'use strict';
var stream = require('stream');
var util = require('util');
var _ = require('lodash');

var Readable = stream.Readable;

var routes = exports.routes = require('../data/routes.json');
exports.stops = require('../data/stops.json');

var DEFAULT_ROUTE_STOPS_OPTIONS = {
  nretries: 5,
};

exports.RouteStopsStream = RouteStopsStream;

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
    route.nretries = 0;
    m[route.route_id] = route;
    return m;
  }, {});
}
util.inherits(RouteStopsStream, Readable);

RouteStopsStream.prototype._read = function() {
  if(_.size(this._doneRoutes) >= _.size(routes)) {
    return this.push(null);
  } else if(_.size(this._pendingRoutes) > 10) {
    return;
  }

  var route = this._routeFromQueue();
  if(!route) {
    return;
  }
  this._processRoute(route.route_id);
};

RouteStopsStream.prototype._processRoute = function(route_id) {
  var _this = this;

  this.emit('http', route_id);

  return this.olhovivoApi.queryStops({ lineCode: route_id })
    .then(function(stops) {
      _this._setState(route_id, 'done');
      return _.map(stops, function(stop) {
        stop.route_id = route_id;
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
        var _this = this;
        process.nextTick(function() {
          _this._processRoute(route_id);
        });
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
  var randomRoute = _.sample(_.values(this._idleRoutes));
  if(!randomRoute) {
    return;
  }

  delete this._idleRoutes[randomRoute.route_id];
  this._pendingRoutes[randomRoute.route_id] = randomRoute;
  return randomRoute;
};
