'use strict';
var gulp = require('gulp');

exports.stylus = function() {
  return gulp.watch(
    [ './css/*.styl', './css/**/*.styl'], ['stylus']
  );
};

exports.javascript = function() {
  return gulp.watch(
    [ './js/*.js', './js/**/*.js', './js/*.jsx', './js/**/*.jsx' ],
    ['browserify']
  );
};

exports.html = function() {
  return gulp.watch(['./*.html', './**/*.html'], ['html']);
};
