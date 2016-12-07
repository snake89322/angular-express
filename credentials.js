module.exports = {
	cookieSecret: 'your cookie secret goes here',
	mongo: {
		development: {
			connectionString: 'mongodb://admin:123456@ds115918.mlab.com:15918/myapp',
		},
		production: {
			connectionString: 'mongodb://admin:123456@ds115918.mlab.com:15918/myapp',
		},
	},
};
