'use strict';
var Promise = require('bluebird');
var request = require('superagent');

Promise.promisifyAll(request.Request.prototype);

exports = module.exports = OlhoVivoApi;

/**
 * OlhoVivoApi is a class wrapping the Olho Vivo real-time API.
 *
 * @param {Object} options
 * @param {String} options.token Required API token (see http://bit.ly/1zjTGHj)
 * @param {String} [options.baseUrl='http://api.olhovivo.sptrans.com.br/v']
 * @param {Boolean} [options.deferAuthentication=false] By default, the
 * constructor will immediatelly try to authenticate with the API and store the
 * result of this operation in a promise to the authenticated cookie jar. If
 * this option is set to true, the wrapper will only authenticate itself when
 * `OlhoVivoApi.prototype.authenticate([token])` is called manually.
 * @param {Mixed} [options.version='0']
 *
 * @constructor
 */

function OlhoVivoApi(options) {
  if(!(this instanceof OlhoVivoApi)) return new OlhoVivoApi(options);

  if(!options || !options.token) {
    throw new Error('Missing required `options` field `token`');
  }

  if(!options.baseUrl) {
    options.baseUrl = 'http://api.olhovivo.sptrans.com.br/v';
  }

  if(!options.version) {
    options.version = '0';
  }

  options.targetUrl = OlhoVivoApi.targetUrl(options);
  this._options = options;

  if(!options.deferAuthentication) {
    delete this._agentP;
    this._agentP = OlhoVivoApi.authenticatedAgent(options);
  }
}

/**
 * Authenticates the wrapper. Called automatically on the constructor by
 * default.
 *
 * Wraps the request: `POST /Login/Autenticar?token={token}`
 *
 * @param {String} [token] Defaults to the options value. If provided will
 * overwrite the cached `._options.token` value.
 * @returns {Promise.<OlhoVivoApi>} Returns a promise to the instance itself
 * after authentication
 */

OlhoVivoApi.prototype.authenticate = function(token) {
  if(!token) token = this._options.token;
  else this._options.token = token;

  var _this = this;
  var agentP = OlhoVivoApi.authenticatedAgent(this._options);

  this._agentP = agentP;

  return agentP
    .then(function() {
      return _this;
    });
};

/**
 * Queries the API for lines matching some search string.
 *
 * Wraps the request: `GET /Linha/Buscar?termosBusca={query}`
 *
 * @param {String} query
 * @return {Promise.<Array>} results Returns a promise to the lines matching the
 * `query`
 */

OlhoVivoApi.prototype.queryLines = function(query) {
  var _this = this;

  return this._agentP.then(function(agent) {
    return agent.get(_this._options.targetUrl + '/Linha/Buscar')
      .query({
        termosBusca: query,
      })
      .endAsync()
      .then(function(res) {
        OlhoVivoApi.checkError(res);
        return JSON.parse(res.text);
      });
  });
};

/**
 * Returns a promise to an authenticated superagent `Agent` instance given an
 * API token
 *
 * @param {Object} options See the `OlhoVivoApi` constructor documentation
 * @returns {Promise.<Agent>}
 */

OlhoVivoApi.authenticatedAgent = function(options) {
  var agent = new request.agent();
  options.targetUrl || (options.targetUrl = OlhoVivoApi.targetUrl(options));

  return agent
    .post(options.targetUrl + '/Login/Autenticar')
    .query({
      token: options.token,
    })
    .endAsync()
    .then(function(res) {
      if(res.status !== 200) {
        throw new Error(
          'Failed to authenticate with the Olho Vivo API.\n' +
          'The API responded with status code ' + res.status + ' and body:\n' +
          res.text
        );
      } else if(res.text !== 'true') {
        throw new Error(
          'Failed to authenticate with the Olho Vivo API.\n' +
          'The API responded with body:' +
          res.text + '\n' +
          'Please check your `token`.'
        );
      }

      return agent;
    });
};

// Give descriptive and cute error messages on failure.
OlhoVivoApi.checkError = function(res) {
  if(res.status !== 200) {
    throw new Error(
      'Request to Olho Vivo API failed with status code ' + res.status + '\n' +
      'and body:\n' +
      res.text
    );
  }
};

// Teach people if they misuse our laziness feature.
Object.defineProperty(OlhoVivoApi.prototype, '_agentP', {
  get: function() {
    if(this.__agentP) {
      return this.__agentP;
    }

    throw new Error(
      'Either call `authenticate` or set `deferAuthentication` as false.\n' +
      'See the documentation for the `OlhoVivoApi` constructor for more information.'
    );
  },

  set: function(agentP) {
    this.__agentP = agentP;
  },
});

OlhoVivoApi.targetUrl = function(options) {
  return options.baseUrl + options.version;
};
