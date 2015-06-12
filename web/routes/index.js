'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');

exports = module.exports = bootstrapRoutes;

/**
 * Bootstraps routes in a route directory (defaults to `__dirname`).
 *
 * @param {Express} app An express application
 * @param {String} [routeDir=__dirname]
 * @return {Object} The hash of required routes
 */

function bootstrapRoutes(app, routeDir) {
  if(!routeDir) routeDir = __dirname;

  var modulePaths = fs.readdirSync(routeDir || __dirname).filter(function(fp) {
    return (
      path.join(routeDir, fp) !== __filename &&
      fp.charAt(0) !== '.' &&
      fp.charAt(0) !== '_'
    );
  });

  return modulePaths.reduce(function(modulePath) {
    return moduleToRouter(require('./' + modulePath));
  }, app);
}

/**
 * Compiles a `module` (an object hash of functions) into a `Router` instance,
 * following RESTful naming conventions.
 * 
 * @param
 */

function moduleToRouter(module) {
  var router = express.Router();
  var methods = Object.keys(module);

  for(var i = 0, len = methods.length; i < len; i++) {
    var methodName = methods[i];
    if(methodName.charAt(0) === '_' || module[methodName].ignore === true) {
      continue;
    }

    var method = module[methodName];
    var route = methodToRoute(methodName, method);
    router[verb](method);
  }

  return router;
}

/**
 * Converts a module's method into a pair of route and HTTP verb.
 *
 * @param {String} methodName
 * @param {Function} method
 * @return {Object} result (result : { verb : String, endpoint : String })
 */

function methodToRoute(methodName, method) {
  var verb;
  var endpoint;

  if(method.verb) verb = method.verb;

  switch(methodName) {
    case 'index': return 'get';
    case 'view': return 'get';
    case 'destroy': return 'delete';
    case 'update': return 'put';
    case 'create': return 'post';
    default:
      throw new Error(
        'Couldn\'t derive endpoint/verb from method ' + methodName + '.'
      );
  }

  if(method.endpoint) endpoint = method.endpoint;

  return {
    endpoint: endpoint,
    verb: verb,
  };
}
