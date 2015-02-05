'use strict';
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var _ = require('lodash');

/**
 * Bootstraps tasks inside of the `tasks` directory
 */

function bootstrapTasks() {
  var taskGroups = _(fs.readdirSync(__dirname))
    .filter(function(fp) {
      return fp !== 'index.js';
    })
    .map(function(fp) {
      return {
        group: _.omit(require('./' + fp), function(v, key) {
          return key.charAt(0) === '_';
        }),
        name: path.basename(fp, '.js'),
      };
    })
    .value();

  _.each(taskGroups, function(tg) {
    var name = tg.name;
    var group = tg.group;

    _.each(group, function(subtask, subtaskName) {
      gulp.task(name + ':' + subtaskName, subtask);
    });

    gulp.task(name, _.map(Object.keys(group), function(subtaskName) {
      return name + ':' + subtaskName;
    }));
  });
}

exports = module.exports = bootstrapTasks;
