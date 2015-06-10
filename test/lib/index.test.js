'use strict'; /* global describe, it, before, after */
var nock = require('nock');
var should = require('should');
var OlhoVivoApi = require('../..');

describe('OlhoVivoApi(options)', function() {
  before(function() {
    require('../api-stub');
  });

  after(function() {
    nock.enableNetConnect();
  });

  describe('the constructor', function() {
    function testNewOlhoVivoApi(options) {
      new OlhoVivoApi(options);
    }

    it('throws if no `options` or `options.token` is provided', function() {
      testNewOlhoVivoApi.bind(null, {}).should.throw();
      testNewOlhoVivoApi.bind(null, undefined).should.throw();
    });

    it('doesn\'t require `options.token` if `deferAuthentication` is `true`', function() {
      testNewOlhoVivoApi.bind(null, {
        deferAuthentication: true,
      }).should.not.throw();
    });

    it('gets exposed', function() {
      should.exist(OlhoVivoApi);
      OlhoVivoApi.should.be.instanceof(Function);
    });
  });

  describe('.prototype.authenticate([token])', function() {
    it('authenticates the client for subsequent requests', function() {
      return new OlhoVivoApi({
        token: 'XXX', // process.env.SPTRANS_TOKEN,
        deferAuthentication: true,
      }).authenticate();
    });
  });

  before(function() {
    this.olhovivoApi = new OlhoVivoApi({
        token: 'XXX', // process.env.SPTRANS_TOKEN,
    });
  });

  describe('.prototype.queryLines(query)', function() {
    it('queries the SPTrans API for lines', function() {
      return this.olhovivoApi.queryLines('bandeira')
        .then(function(results) {
          results.should.containEql({
            CodigoLinha: 33674,
            Circular: false,
            Letreiro: '2021',
            Sentido: 2,
            Tipo: 10,
            DenominacaoTPTS: 'ESTACAO GUAIANAZES',
            DenominacaoTSTP: 'JD. BANDEIRANTES',
            Informacoes: null
          });
        });
    });
  });

  describe('.prototype.lineDetails(lineCode)', function() {
    it('queries the SPTrans API for lines', function() {
      return this.olhovivoApi.lineDetails(33674)
        .then(function(/*results*/) {
          // There's nothing to expect here... The endpoint is wrapped, but I
          // can't find a use for it
        });
    });
  });

  describe('.prototype.queryStops(query)', function() {
    it('queries the SPTrans API for stops by search string', function() {
      return this.olhovivoApi.queryStops('afonso')
        .then(function(results) {
          results.should.containEql({
            CodigoParada: 340015331,
            Nome: 'AFONSO BRAZ C/B2',
            Endereco: 'R DOUTORA MARIA AUGUSTA SARAIVA/ R NATIVIDADE',
            Latitude: -23.595087,
            Longitude: -46.673152,
          });
        });
    });

    it('queries the SPTrans API for stops by line code', function() {
      return this.olhovivoApi.queryStops({ lineCode: 1272 })
        .then(function(results) {
          results.should.containEql({
            CodigoParada: 480012877,
            Endereco: 'AC PONTE DO PIQUERI AV EMB MACEDO SOARES/ R PROFESSORA SURAIA AIDAR MENON',
            Latitude: -23.511052,
            Longitude: -46.705493,
            Nome: 'MARGINAL B/C'
          });
        });
    });
  });

  describe('.prototype.expressLanes()', function() {
    it('gets all the express lane objects', function() {
      return this.olhovivoApi.expressLanes()
        .then(function(results) {
          results.should.containEql({
            CodCot: 0,
            CodCorredor: 2,
            Nome: 'Santo Amaro',
          });
        });
    });
  });

  describe('.prototype.linePositions(lineCode)', function() {
    it('gets all bus positions relative to a line code', function() {
      return this.olhovivoApi.linePositions(33674)
        .then(function(/*results*/) {
          // There's nothing to expect here without proper stubs...
        });
    });
  });

  describe('.prototype.arrivalTimes(query)', function() {
    it('gets all arrival times relative to a query', function() {
      return this.olhovivoApi.arrivalTimes({ lineCode: 33674 })
        .then(function(/*results*/) {
          // There's nothing to expect here without proper stubs...
        });
    });
  });
});
