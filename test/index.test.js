'use strict'; /* global describe, it, before */
var should = require('should');
var OlhoVivoApi = require('..');

describe('OlhoVivoAPI(options)', function() {
  it('gets exposed', function() {
    should.exist(OlhoVivoApi);
    OlhoVivoApi.should.be.instanceof(Function);
  });

  describe('.prototype.authenticate([token])', function() {
    it('authenticates the client for subsequent requests', function() {
      return new OlhoVivoApi({
        token: process.env.SPTRANS_TOKEN,
        deferAuthentication: true,
      }).authenticate();
    });
  });

  before(function() {
    this.olhovivoApi = new OlhoVivoApi({
      token: process.env.SPTRANS_TOKEN,
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
});
