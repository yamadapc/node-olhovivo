'use strict';
var gulp = require('gulp');
var stylus = require('gulp-stylus');

exports.all = function() {
  gulp.src('./css/index.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
};
