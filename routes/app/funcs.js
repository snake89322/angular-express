var fs = require('fs');
module.exports = function (router) {
	//确保存在目录 data
	var dataDir = process.cwd() + '/data';
	var fsDir = dataDir + '/fs';
	fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
	fs.existsSync(fsDir) || fs.mkdirSync(fsDir);
	function saveContestEntry(contestName, email, year, month, photoPath){
		// TODO……这个稍后再做
	}
	// fs路由
	router.get('/funcs/fs', function (req, res) {		
		res.render('funcs/fs');
	});

	app.post('/funcs/fs-post/:year/:month', function (req, res) {
		
	});
};
