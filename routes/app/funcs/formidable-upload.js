/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 */
var fs = require('fs');
var formidable = require('formidable');
var fileUtils = require('../../../lib/fileUtils.js');

module.exports = function (router) {
	//确保存在目录 data
	var dataDir = process.cwd() + '/public/data';
	var fsDir = dataDir + '/formidableUpload';
	fileUtils.ensureDirExist(dataDir, fsDir);

	function saveContestEntry(contestName, email, year, month, photoPath){
		// TODO……这个稍后再做 应该是上传数据库操作
	};

	// fs路由
	router.get('/funcs/formidable-upload', function (req, res) {	
		var now = new Date();	
		res.render('funcs/formidable-upload', {
			title: 'funcs-formidable-upload',
			disp: 'name',
			year: now.getFullYear(),
			month: now.getMonth() + 1
		});
	});

	router.post('/funcs/formidable-upload/:year/:month', function (req, res) {
		var form = new formidable.IncomingForm();
		form.uploadDir = fsDir;
		form.parse(req, function (err, fields, files) {
			// 先跳转吧
			if (err) return res.redirect(303, '/error');
			if (err) {
				// flash消息显示技术
			}
			var datamark = Date.parse(new Date());
			var file = files.photo;
			var upFile = fsDir + '/' + datamark + file.name;
			
			fs.renameSync(file.path, upFile);

			setTimeout( function () {
				fs.unlink(upFile, function (err) {
					if (err) throw err;
					console.log('successfully deleted ' + file.name);
				});
			}, 5000);
			
			return res.redirect(303, '/funcs/formidable-upload');
		});
	});
};
