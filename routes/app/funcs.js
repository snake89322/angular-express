/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 */
var fs = require('fs');
var formidable = require('formidable');

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
		var now = new Date();	
		res.render('funcs/fs', {
			year: now.getFullYear(),
			month: now.getMonth()
		});
	});

	router.post('/funcs/fs/:year/:month', function (req, res) {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			// 先跳转吧
			if (err) return res.redirect(303, '/error');
			if (err) {
				// flash消息显示技术
			}
			var file = files.file;
			var dir = fsDir + '/' + file.name;
			var readStream, writeStream;
			console.log(files);
			// fs.mkdirSync(dir);
			
			// fs.renameSync(file.path, dir + '/' + file.name);
			readStream = fs.createReadStream(file.path)
			writeStream = fs.createWriteStream(fsDir + '/' + file.name);
			readStream.pipe(writeStream);

			readStream.on("end", function() {
				// Operation done
				fs.unlinkSync(file.path);
			});
			return res.redirect(303, '/funcs/fs');
		});
	});
};
