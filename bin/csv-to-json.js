'use strict';
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var csv = require('csv');

Promise.promisifyAll(fs);

exports.readCsvFile = function readCsvFile(fp) {
  return new Promise(function(fulfill, reject) {
    var csvData = fs.readFileSync(fp).toString();
    csv.parse(csvData, { columns: true, }, function(err, data) {
      if(err) return reject(err);
      fulfill(data);
    });
  });
};

exports.writeJsonFile = function writeJsonFile(fp, data) {
  return fs.writeFileAsync(fp, JSON.stringify(data));
};

exports.main = function main() {
  var rootDir = path.join(__dirname, '../data');

  var fileList = fs.readdirSync(rootDir)
    .filter(function(dataFile) {
      return path.extname(dataFile) === '.txt';
    });

  return Promise.map(fileList, function(fp) {
    var newPath = path.basename(fp, '.txt') + '.json';

    console.log('Converting ' + fp + ' to ' + newPath);
    return exports.readCsvFile(path.join(rootDir, fp))
      .then(function(data) {
        return exports.writeJsonFile(path.join(rootDir, newPath), data);
      });
  });
};

if(!module.parent) exports.main().then(function() { console.log('Done!'); });
