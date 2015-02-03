'use strict';
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');
var mongodb = require('mongodb');
var OlhoVivoApi = require('olhovivo');

Promise.promisifyAll(mongodb);
Promise.promisifyAll(mongodb.MongoClient);

function currentTime() {
  return new Date().toTimeString().split(' ')[0];
}

var log = exports.log = function log(level, message) {
  if(console[level] instanceof Function) {
    console[level]('[' + level + '] (' + currentTime() + ') ' + message);
  }
};

var logFatal = exports.logFatal = function logFatal(err) {
  if(!err) err = 'Unknown error.';
  log('error', err.message);
  log('error', err.stack || err);
  process.exit(err.code || 1);
};

var waitP = exports.waitP = function waitP(ts) {
  return new Promise(function(fulfill/*, reject*/) {
    setTimeout(fulfill, ts);
  });
};

var foreverInterval = exports.foreverInterval =
function foreverInterval(fn, ts) {
  return fn()
    .catch(function(err) {
      log('error', err.message);
      log('error', err.stack);
    })
    .then(function() {
      return waitP(ts)
        .then(foreverInterval.bind(null, fn, ts));
    });
};

exports.chunksOf = function chunksOf(chunkSize, arr) {
  var ret = [];
  for(var i = 0, len = arr.length / chunkSize; i < len; i++) {
    ret[i] = [];
    for(var j = 0; j < chunkSize && i * chunkSize + j < arr.length; j++) {
      ret[i].push(arr[i * chunkSize + j]);
    }
  }
  return ret;
};

exports.discoverLines = function discoverLines(olhovivoApi) {
  log('info', 'Discovering lines from the API...');
  var routes = fs.readFileSync(path.join(__dirname, './routes.txt'))
    .toString()
    .split('\n');

  return Promise.map(routes, function(line) {
    var linePrime = line.split(',')[0].split('-')[0].replace(/[^0-9]/g, '');
    return olhovivoApi.queryLines(linePrime);
  }).then(function(results) {
    return _.uniq(_.flatten(results), function(line) {
      return line.CodigoLinha;
    });
  });
};

exports.insertLines = function insertLines(db, lines) {
  log('info', 'Inserting lines into the database...');
  var linesColl = db.collection('lines');

  // Fetch which fetched lines already exist in the database
  var lineCodes = _.map(lines, _.partialRight(_.pick, 'CodigoLinha'));
  var query = { $or: lineCodes };
  var existingLinesP = linesColl.find(query).toArrayAsync();

  // Decide which lines to insert based on that information
  var toInsertLinesP = existingLinesP.then(function(existingLines) {
    return _.filter(lines, function(line) {
      return !_.some(existingLines, { CodigoLinha: line.CodigoLinha });
    });
  });

  // Insert the filtered lines list
  return toInsertLinesP.then(function(toInsertLines) {
    // Only 1000 documents per `insert`
    var chunks = exports.chunksOf(1000, toInsertLines);
    return Promise.map(chunks, function(chunk) {
      log('info', 'Inserting ' + chunk.length + ' lines into the database');
      return linesColl.insertManyAsync(chunk, { w: 1 });
    });
  });
};

exports.insertLinesWorker = function insertLinesWorker(db, olhovivoApi) {
  function start() {
    return exports.discoverLines(olhovivoApi)
      .then(exports.insertLines.bind(null, db));
  }

  var interval = foreverInterval(start, 1000);
  process.nextTick(start);
  return interval;
};

exports.getLines = function getLines(db) {
  log('info', 'Getting lines from the database...');
  return db.collection('lines').find({}).toArrayAsync();
};

exports.getPositions = function getPositions(olhovivoApi, lines) {
  log('info', 'Getting positions from the API...');
  var total = lines.length;
  var completed = 0;

  return Promise
    .map(lines, function(line) {
      return olhovivoApi.linePositions(line.CodigoLinha)
        .then(function(positions) {
          log(
            'info',
            'Got positions for line ' + line.CodigoLinha + ' ' +
            (++completed) + '/' + total
          );

          return _.map(positions.vs, function(position) {
            return _.extend(position, {
              CodigoLinha: line.CodigoLinha,
              positonTime: positions.hr,
              lineId: line._id,
            });
          });
        });
    })
    .then(_.flatten);
};

exports.insertPositions = function insertPositions(db, positions) {
  log(
    'info',
    'Inserting ' + positions.length + ' positions into the database...'
  );

  var positionsColl = db.collection('positions');
  var chunks = exports.chunksOf(1000, positions);
  return Promise.map(chunks, function(chunk) {
    return positionsColl.insertManyAsync(chunk, { w: 1 });
  });
};

exports.insertPositionsWorker =
function insertPositionsWorker(db, olhovivoApi) {
  return foreverInterval(function() {
    return exports.getLines(db)
      .then(exports.getPositions.bind(null, olhovivoApi))
      .then(exports.insertPositions.bind(null, db));
  }, 500);
};

exports.main = function main() {
  var mongodbUrl = 'mongodb://localhost:27017/test';
  var sptransToken = process.env.SPTRANS_TOKEN;

  log('info', 'Setting-up');
  var dbP = mongodb.MongoClient.connectAsync(mongodbUrl);
  var olhovivoApiP = new OlhoVivoApi({
    deferAuthentication: true,
    token: sptransToken,
  }).authenticate();

  var setupP = Promise.join(dbP, olhovivoApiP);

  //var lineswP = setupP.spread(exports.insertLinesWorker);
  var positionswP = setupP.spread(exports.insertPositionsWorker);

  //return Promise.join(lineswP, positionswP);
  return positionswP;
};

if(!module.parent) {
  exports.main()
    .then(
      function() {
        log('info', 'Done');
      },
      function(err) {
        logFatal(err);
      }
    );
}
