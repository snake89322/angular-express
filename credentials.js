module.exports = {
	cookieSecret: 'your cookie secret goes here',
	eastmail: {
		user: 'chzhwtnt@163.com',
		password: 'App123456',
	},
	mongo: {
		development: {
			connectionString: 'mongodb://admin:123456@ds115918.mlab.com:15918/myapp',
		},
		production: {
			connectionString: 'mongodb://admin:123456@ds115918.mlab.com:15918/myapp',
		},
	},
};
