var opts = require('../../../lib/opts.js');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

suite('Opts format tests', function () {
	test('opts should return objects', function() {
		for (var key in opts) {
			expect(opts[key]).to.be.an('object');
		}
	});
});
