'use strict';
var gulp = require('gulp');
var bootstrapTasks = require('./tasks');

bootstrapTasks();

gulp.task('default', ['browserify', 'stylus', 'html', 'serve', 'watch']);
