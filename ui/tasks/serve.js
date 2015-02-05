'use strict';
var gutil = require('gulp-util');
var express = require('express');
var livereload = require('gulp-livereload');

var PORT = process.env.PORT || 3000;
var LIVERELOAD_PORT = process.env.LIVERELOAD_PORT || 35729;

exports.devserver = function() {
  var app = express();
  app.use(express.static('./dist'));
  app.listen(PORT, function() {
    gutil.log('Development server started on port ' + PORT);
  });
};

exports.lrserver = function() {
  return livereload.listen({
    port: LIVERELOAD_PORT
  });
};
