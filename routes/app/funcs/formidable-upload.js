/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 */
var fs = require('fs');
var formidable = require('formidable');
var fileUtils = require('../../lib/fileUtils.js');

module.exports = function (router) {
	//确保存在目录 data
	var dataDir = process.cwd() + '/data';
	var fsDir = dataDir + '/fs';
	fileUtils.ensureDirExist(dataDir, fsDir);

	function saveContestEntry(contestName, email, year, month, photoPath){
		// TODO……这个稍后再做 应该是上传数据库操作
	};

	// fs路由
	router.get('/funcs/fs', function (req, res) {	
		var now = new Date();	
		res.render('funcs/fs', {
			title: 'funcs-fs',
			disp: 'name',
			year: now.getFullYear(),
			month: now.getMonth() + 1
		});
	});

	router.post('/funcs/fs/:year/:month', function (req, res) {
		var form = new formidable.IncomingForm();
		form.uploadDir = fsDir;
		form.parse(req, function (err, fields, files) {
			// 先跳转吧
			if (err) return res.redirect(303, '/error');
			if (err) {
				// flash消息显示技术
			}
			var datamark = Date.parse(new Date());
			var file = files.file;
			var upFile = fsDir + '/' + datamark + file.name;
			
			fs.renameSync(file.path, upFile);

			setTimeout( () => {
				fs.unlink(upFile, (err) => {
					if (err) throw err;
					console.log('successfully deleted /tmp/hello');
				});
			}, 3000)
			
			return res.redirect(303, '/funcs/fs');
		});
	});
};
