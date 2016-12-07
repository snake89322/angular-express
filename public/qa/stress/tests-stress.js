var loadtest = require('loadtest');
var assert = require('chai').assert;

suite('Stress tests', function () {
	test('Homepage should handle 100 requests in a second', function (done) {
		var options = {
			url: 'http://localhost:3000',
			concurrency: 4,
			maxRequests: 100
		};
		loadtest.loadTest(options, function (err, result) {
			assert(!err);
			assert(result.totalTimeSeconds < 1);
			done();
		})
	})
})
