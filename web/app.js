'use strict';
var http = require('http');
var Promise = require('bluebird');
var _ = require('lodash');
var OlhoVivoApi = require('olhovivo');
var socketio = require('socket.io');

var lines = require('./line-codes.json');

var SPTRANS_TOKEN = process.env.SPTRANS_TOKEN;

var io = socketio(http);

io.on('connection', function() {
  console.log('[INFO] - ' + new Date().toUTCString() + ' - Client connected!');
});

function getPositions(olhovivo, line) {
  return olhovivo.linePositions(line.line_id)
    .then(function(positions) {
      return _.map(positions.vs, function(position) {
        return _.extend(position, {
          CodigoLinha: line.line_id,
          positonTime: positions.hr,
        });
      });
    });
}

function fetchAndEmitInfo(olhovivo) {
  var nconnections = 0;
  return Promise
    .map(lines, function guardedGetPositions(line) {
      if(nconnections > 10) {
        setTimeout(function() {
          guardedGetPositions(line);
        }, 400);
      }

      nconnections++;
      return getPositions(olhovivo, line)
        .then(function(positions) {
          nconnections--;
          console.log('[INFO] - ' + new Date().toUTCString() + ' - Emitting positions');
          io.emit('positions', positions);
        })
        .catch(function(err) {
          nconnections--;
          //console.error('[ERROR] - ' + new Date().toUTCString() + ' -  ' + err.message);
          return guardedGetPositions(line);
        });
    });
}

exports.listen = function(port) {
  var olhovivoApiP = new OlhoVivoApi({
    deferAuthentication: true,
    token: SPTRANS_TOKEN,
  }).authenticate();

  setInterval(function() {
    olhovivoApiP.then(function(olhovivo) {
      fetchAndEmitInfo(olhovivo);
    });
  }, 1000);

  io.listen(port);
};
