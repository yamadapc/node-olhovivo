'use strict';
var gulp = require('gulp');
var livereload = require('gulp-livereload');

exports.copy = function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
};
