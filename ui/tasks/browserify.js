'use strict';
var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var reactify = require('reactify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

exports.lib = function() {
  var bundler = browserify({
    extensions: ['.jsx'],
    entries: [
      './js/index.jsx',
    ],
  });

  bundler.transform(reactify);

  bundler.bundle()
    .pipe(source('./js/bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
};
