'use strict';
var stream = require('stream');
var util = require('util');
var _ = require('lodash');

var Readable = stream.Readable;

var stops = exports.stops = require('../../data/stops.json');

var DEFAULT_LINES_OPTIONS = {
  nretries: 5,
};

exports.LinesStream = LinesStream;

function LinesStream(options) {
  Readable.call(this, {
    objectMode: true,
  });

  if(!options && options.olhovivoApi) {
    throw new Error('Missing required option `olhovivoApi`');
  }
  _.defaults(options, DEFAULT_LINES_OPTIONS);

  this.olhovivoApi = options.olhovivoApi;
  this.nretries = options.nretries;
  this._results = [];

  this._doneStops = {};
  this._erroredStops = {};
  this._pendingStops = {};
  this._idleStops = _.reduce(stops, function(m, stop) {
    stop.nretries = 0;
    m[stop.stop_id] = stop;
    return m;
  }, {});
}
util.inherits(LinesStream, Readable);

LinesStream.prototype._read = function() {
  if(_.size(this._doneStops) >= _.size(stops)) {
    return this.push(null);
  } else if(_.size(this._pendingStops) > 100) {
    return;
  }

  var stop = this._stopFromQueue();
  if(!stop) {
    return;
  }
  this._processStop(stop.stop_id);
};

LinesStream.prototype._processStop = function(stop_id) {
  var _this = this;

  this.emit('http', stop_id);

  return this.olhovivoApi.arrivalTimes({ stopCode: stop_id })
    .then(function(arrivalTimes) {
      _this._setState(stop_id, 'done');
      if(!arrivalTimes.p || !arrivalTimes.p.l) return;

      return _.map(arrivalTimes.p.l, function(arrivalTime) {
        _this.push({
          line_id: arrivalTime.cl,
          line_number: arrivalTime.c,
          stop_id: stop_id,
        });
      });
    })
    .catch(this._setState.bind(this, stop_id, 'errored'));
};

LinesStream.prototype._setState = function(stop_id, st, err) {
  var targetStop;

  switch(st) {
    case 'done':
      targetStop = this._pendingStops[stop_id];
      delete this._pendingStops[stop_id];
      this._doneStops[stop_id] = targetStop;
      break;
    case 'pending':
      targetStop = this._idleStops[stop_id];
      delete this._idleStops[stop_id];
      this._pendingStops[stop_id] = targetStop;
      break;
    case 'errored':
      targetStop = this._pendingStops[stop_id];
      if(!targetStop) {
        return;
      }

      if(targetStop.nretries < this.nretries) {
        targetStop.nretries++;
        var _this = this;
        process.nextTick(function() {
          _this._processStop(stop_id);
        });
      } else {
        delete this._pendingStops[stop_id];
        targetStop.error = err;
        this._erroredStops[stop_id] = targetStop;
      }
      break;
    default:
      this._idleStops[stop_id] =
        this._pendingStops[stop_id] ||
        this._erroredStops[stop_id] ||
        this._doneStops[stop_id] ||
        this._idleStops[stop_id];
      break;
  }
};

LinesStream.prototype._stopFromQueue = function() {
  var randomStop = _.sample(_.values(this._idleStops));
  if(!randomStop) {
    return;
  }

  delete this._idleStops[randomStop.stop_id];
  this._pendingStops[randomStop.stop_id] = randomStop;
  return randomStop;
};

