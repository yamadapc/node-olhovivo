'use strict'; /* global describe, it */
require('should');
var fetching_worker = require('./fetching_worker');

describe('fetching_worker', function() {
  describe('chunksOf(chunkSize, arr)', function() {
    it('returns an array split up into chunks of the specified size', function() {
      fetching_worker.chunksOf(2, [1, 2, 3, 4, 5, 6])
        .should.eql([[1, 2], [3, 4], [5, 6],]);
      fetching_worker.chunksOf(3, [1, 2, 3, 4, 5, 6, 7])
        .should.eql([[1, 2, 3], [4, 5, 6], [7],]);
    });
  });
});
