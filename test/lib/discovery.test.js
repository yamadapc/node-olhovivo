'use strict'; /* global describe, it, before, beforeEach */
var makeStub = require('mocha-make-stub');
var should = require('should');
var OlhoVivoApi = require('../../lib/index.js');

var discovery = require('../../lib/discovery');

describe('discovery', function() {
  before(function() {
    this.olhovivoApi = new OlhoVivoApi({
      token: 'XXX' // process.env.SPTRANS_TOKEN,
    });
  });

  describe('.RouteStopsStream(options)', function() {
    it('gets exposed', function() {
      should.exist(discovery.RouteStopsStream);
      discovery.RouteStopsStream.should.be.instanceof(Function);
    });

    beforeEach(function() {
      this.routeStopsStream = new discovery.RouteStopsStream({
        olhovivoApi: this.olhovivoApi,
      });
    });

    describe('._processRoute(route_id)', function() {
      makeStub('routeStopsStream', 'push');

      it('discover stops for a certain route', function() {
        this.routeStopsStream._processRoute(discovery.routes[0])
          .then(function() {
          });
      });
    });
  });
});
