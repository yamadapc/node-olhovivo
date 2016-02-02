node-olhovivo
=============
[![Build Status](https://travis-ci.org/yamadapc/node-olhovivo.svg)](https://travis-ci.org/yamadapc/node-olhovivo)
[![Coverage Status](https://coveralls.io/repos/yamadapc/node-olhovivo/badge.svg?branch=master)](https://coveralls.io/r/yamadapc/node-olhovivo?branch=master)
[![Dependency Status](https://david-dm.org/yamadapc/node-olhovivo.svg)](https://david-dm.org/yamadapc/node-olhovivo)
[![devDependency Status](https://david-dm.org/yamadapc/node-olhovivo/dev-status.svg)](https://david-dm.org/yamadapc/node-olhovivo#info=devDependencies)
[![npm downloads](http://img.shields.io/npm/dm/olhovivo.svg)](https://www.npmjs.org/package/olhovivo)
[![npm version](http://img.shields.io/npm/v/olhovivo.svg)](https://www.npmjs.org/package/olhovivo)
- - -
A node.js wrapper for the SPTrans Olho Vivo API.

## Installing
You can install this library with:
```bash
npm install --save olhovivo
```

## Usage
```javascript
var OlhoVivoApi = require('olhovivo');
var olhovivoApi = new OlhoVivoApi({
  token: process.env.SPTRANS_TOKEN,
});

olhovivoApi.queryLines('bandeira')
  .then(function(lines) {
    console.log(lines);
  });
```

## Progress
Wrapped endpoints:
- [x] `POST /Login/Autenticar?token={token}`
- [x] `GET /Linha/Buscar?termosBusca={termosBusca}`
- [x] `GET /Linha/CarregarDetalhes?codigoLinha={codigoLinha}`
- [x] `GET /Parada/Buscar?termosBusca={termosBusca}`
- [x] `GET /Parada/BuscarParadasPorLinha?codigoLinha={codigoLinha}`
- [x] `GET /Parada/BuscarParadasPorCorredor?codigoCorredor={codigoCorredor}`
- [x] `GET /Corredor`
- [x] `GET /Posicao?codigoLinha={codigoLinha}`
- [x] `GET /Previsao?codigoParada={codigoParada}&codigoLinha={codigoLinha}`
- [x] `GET /Previsao/Linha?codigoLinha={codigoLinha}`
- [x] `GET /Previsao/Parada?codigoParada={codigoParada}`

## Documentation
### `OlhoVivoApi`

OlhoVivoApi is a class wrapping the Olho Vivo real-time API. The `token`
option is not required if the `deferAuthentication` option is set to true.


#### Params:

* **Object** *options*
* **String** *[options.token]* OlhoVivo API token (see http://bit.ly/1zjTGHj)
* **String** *[options.baseUrl='http://api.olhovivo.sptrans.com.br/v']*
* **Boolean** *[options.deferAuthentication=false]* By default, the constructor
  will immediatelly try to authenticate with the API and store the result of
  this operation in a promise to the authenticated cookie jar. If this option is
  set to true, the wrapper will only authenticate itself when
  `OlhoVivoApi.prototype.authenticate([token])` is called manually.
* **Mixed** *[options.version='0']*

### `OlhoVivoApi.prototype.queryLines(query)`

Queries the API for lines matching some search string.

Wraps the request: `GET /Linha/Buscar?termosBusca={query}`

#### Params:

* **String** query

#### Return:

* **Promise.<Array>** results Returns a promise to the lines matching the
  `query`

### `OlhoVivoApi.prototype.lineDetails(lineCode)`
Fetches details for a given line code

Wraps the request: `GET /Linha/CarregarDetalhes?codigoLinha={codigoLinha}`

#### Params:

* **Mixed** lineCode

#### Return:
* **Promise.<Array>** results Returns a promise to the line's "details"

### `OlhoVivoApi.prototype.queryStops(query)`

Queries for stops. If the query is a string, it'll work the same as
`queryLines`, two extra options are provided, however. Querying by line code or
express lane code. This is done by passing an object rather than a string, with
either a `lineCode` or `expressLaneCode` field (not both).

Wraps the requests:
- `GET /Parada/Buscar?termosBusca={termosBusca}`
- `GET /Parada/BuscarParadasPorLinha?codigoLinha={codigoLinha}`
- `GET /Parada/BuscarParadasPorCorredor?codigoCorredor={codigoCorredor}`

#### Example:
```javascript
var olhovivoapi = new OlhoVivoApi(process.env.SPTRANS_TOKEN);

olhovivoapi.queryStops('bla');                     // Stops matching 'bla'
olhovivoapi.queryStops({ lineCode: 33674 });       // Stops in this line
olhovivoapi.queryStops({ expressLaneCode: 0000 }); // Stops in this lane
```

#### Params:

* **[object Object]** *query* If a string is provided, the stops

#### Return:

* **Promise.<Array>** results Returns a promise to the stops matching the `query`

### `OlhoVivoApi.prototype.expressLanes()`

Fetches a list of all existent express lane objects

Wraps the request: `GET /Corredor`

#### Return:

* **Promise.<Array>**

### `OlhoVivoApi.prototype.linePositions(lineCode)`

Queries the API for a line buses' positions.

Wraps the request: `GET /Posicao?codigoLinha={codigoLinha}`

#### Params:

* **Mixed** *lineCode*

#### Return:

* **Promise.<Array>** A promise to this line buses' positions

### `OlhoVivoApi.prototype.arrivalTimes(query)`

Gets the arrival times for a certain stop and/or buses in a specific line. If
both a `lineCode` and `stopCode` are provided, the result will be the arrival
times for buses on the target line until the target stop. If only a `stopCode`
is provided, the result will be the arrival times for all buses on the target
stop. And if only a `lineCode` is provided, the result will be the arrival times
for all buses on the target line on all stops.

Wraps the requests:
- `GET /Previsao?codigoParada={codigoParada}&codigoLinha={codigoLinha}`
- `GET /Previsao/Linha?codigoLinha={codigoLinha}`
- `GET /Previsao/Parada?codigoParada={codigoParada}`

#### Params:

* **Object** *query* If a string is provided, the stops
* **Object** *[query.lineCode]*
* **Object** *[query.stopCode]*

#### Return:

* **Promise.<Array>** results Returns a promise to matching buses' arrival times

### `OlhoVivoApi.prototype.authenticate(token)``

Authenticates the wrapper. Called automatically on the constructor by
default.

Wraps the request: `POST /Login/Autenticar?token={token}`

#### Params:

* **String** [token] Defaults to the options value. If provided will overwrite
  the cached `._options.token` value.

#### Return:
* **Promise.<OlhoVivoApi>** Returns a promise to the instance itself after
  authentication

## License
This code is licensed under the MIT license for Pedro Tacla Yamada. For more
information please refer to the [LICENSE](/LICENSE) file.

## Donations
Would you like to buy me a beer? Send bitcoin to 3JjxJydvoJjTrhLL86LGMc8cNB16pTAF3y
