'use strict';
var Promise = require('bluebird');
var request = require('superagent');

Promise.promisifyAll(request.Request.prototype);

exports = module.exports = OlhoVivoApi;

/**
 * OlhoVivoApi is a class wrapping the Olho Vivo real-time API. The `token`
 * option is not required if the `deferAuthentication` option is set to true.
 *
 * @param {Object} options
 * @param {String} [options.token] OlhoVivo API token (see http://bit.ly/1zjTGHj)
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

  if(!options || (!options.deferAuthentication && !options.token)) {
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
 * @returns {Promise.<Array>} results Returns a promise to the lines matching
 * the `query`
 */

OlhoVivoApi.prototype.queryLines = function(query) {
  return this._getRequest('/Linha/Buscar', {
    termosBusca: query,
  });
};

/**
 * Fetches details for a given line code
 *
 * Wraps the request: `GET /Linha/CarregarDetalhes?codigoLinha={codigoLinha}`
 *
 * @param {Mixed} lineCode
 * @return {Promise.<Array>} results Returns a promise to the line's "details"
 */

OlhoVivoApi.prototype.lineDetails = function(lineCode) {
  return this._getRequest('/Linha/CarregarDetalhes', {
    codigoLinha: lineCode,
  });
};

/**
 * Queries for stops. If the query is a string, it'll work the same as
 * `queryLines`, two extra options are provided, however. Querying by line code
 * or express lane code. This is done by passing an object rather than a string,
 * with either a `lineCode` or `expressLaneCode` field (not both).
 *
 * Wraps the requests:
 * - `GET /Parada/Buscar?termosBusca={termosBusca}`
 * - `GET /Parada/BuscarParadasPorLinha?codigoLinha={codigoLinha}`
 * - `GET /Parada/BuscarParadasPorCorredor?codigoCorredor={codigoCorredor}`
 *
 * @example
 *    var olhovivoapi = new OlhoVivoApi(process.env.SPTRANS_TOKEN);
 *    olhovivoapi.queryStops('bla');                     // Stops matching 'bla'
 *    olhovivoapi.queryStops({ lineCode: 33674 });       // Stops in this line
 *    olhovivoapi.queryStops({ expressLaneCode: 0000 }); // Stops in this lane
 *
 * @param {{String|Object}} query If a string is provided, the stops
 * @returns {Promise.<Array>} results Returns a promise to the stops matching the
 * `query`
 */

OlhoVivoApi.prototype.queryStops = function(query) {
  if(!query) throw new Error('Missing required parameter `query`');

  if(typeof query === 'string') {
    return this._getRequest('/Parada/Buscar', {
      termosBusca: query,
    });
  } else if(query.lineCode) {
    return this._getRequest('/Parada/BuscarParadasPorLinha', {
      codigoLinha: query.lineCode,
    });
  } else if(query.expressLaneCode) {
    return this._getRequest('/Parada/BuscarParadasPorCorredor', {
      codigoCorredor: query.expressLaneCode,
    });
  } else {
    throw new Error(
      'The `query` parameter must either be a string or have a `lineCode` or ' +
      '`expressLaneCode` field'
    );
  }
};

/**
 * Fetches a list of all existent express lane objects
 *
 * Wraps the request: `GET /Corredor`
 *
 * @returns {Promise.<Array>}
 */

OlhoVivoApi.prototype.expressLanes = function() {
  return this._getRequest('/Corredor', {});
};

/**
 * Queries the API for a line buses' positions.
 *
 * Wraps the request: `GET /Posicao?codigoLinha={codigoLinha}`
 *
 * @param {Mixed} lineCode
 * @returns {Promise.<Array>} A promise to this line buses' positions
 */

OlhoVivoApi.prototype.linePositions = function(lineCode) {
  return this._getRequest('/Posicao', {
    codigoLinha: lineCode,
  });
};

/**
 * Gets the arrival times for a certain stop and/or buses in a specific line. If
 * both a `lineCode` and `stopCode` are provided, the result will be the arrival
 * times for buses on the target line until the target stop. If only a
 * `stopCode` is provided, the result will be the arrival times for all buses on
 * the target stop. And if only a `lineCode` is provided, the result will be the
 * arrival times for all buses on the target line on all stops.
 *
 * Wraps the requests:
 * - `GET /Previsao?codigoParada={codigoParada}&codigoLinha={codigoLinha}`
 * - `GET /Previsao/Linha?codigoLinha={codigoLinha}`
 * - `GET /Previsao/Parada?codigoParada={codigoParada}`
 *
 * @param {Object} query If a string is provided, the stops
 * @param {Object} [query.lineCode]
 * @param {Object} [query.stopCode]
 * @returns {Promise.<Array>} results Returns a promise to matching buses'
 * arrival times
 */

OlhoVivoApi.prototype.arrivalTimes = function(query) {
  if(!query) throw new Error('Missing required parameter `query`');

  if(query.lineCode && query.stopCode) {
    return this._getRequest('/Previsao', {
      codigoParada: query.stopCode,
      codigoLinha: query.lineCode,
    });
  } else if(query.lineCode) {
    return this._getRequest('/Previsao/Linha', {
      codigoLinha: query.lineCode,
    });
  } else if(query.stopCode) {
    return this._getRequest('/Previsao/Parada', {
      codigoParada: query.stopCode,
    });
  } else {
    throw new Error(
      'The `query` parameter must either have a `lineCode` or `stopCode` field'
    );
  }
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

  if(!options) throw new Error('Missing required parameter `options`');

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

/**
 * Makes a GET request to the API. Sending a payload as the querystring and
 * parsing the JSON response. Also checks for errors.
 *
 * @param {String} endpoint
 * @param {Object} qs
 * @returns {Promise.<Object>} A promise to the parsed response
 */

OlhoVivoApi.prototype._getRequest = function(endpoint, qs) {
  var _this = this;
  return this._agentP.then(function(agent) {
    return agent.get(_this._options.targetUrl + endpoint)
      .query(qs)
      .endAsync()
      .then(function(res) {
        OlhoVivoApi._checkError(res);
        return JSON.parse(res.text);
      });
  });
};

// Give descriptive and cute error messages on failure.
OlhoVivoApi._checkError = function(res) {
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

// Build the target URL, according to versioning rules in the documentation
OlhoVivoApi.targetUrl = function(options) {
  return options.baseUrl + options.version;
};
