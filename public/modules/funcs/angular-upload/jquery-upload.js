/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 */
var jqupload = require('jquery-file-upload-middleware');
var fileUtils = require('../../../lib/fileUtils.js');

module.exports = function (router) {
	//确保存在目录 data
	var dataDir = process.cwd() + '/public/data';
	var fsDir = dataDir + '/upload';
	var now = new Date();

	fileUtils.ensureDirExist(dataDir);
	
	/// Redirect all to home except post
	router.get('/upload', function(req, res){
			res.redirect('/');
	});

	router.put('/upload', function(req, res){
			res.redirect('/');
	});

	router.delete('/upload', function(req, res){
			res.redirect('/');
	});

	router.use('/upload', function (req, res, next) {
		jqupload.fileHandler({
			uploadDir: function () {
				return fsDir + Date.parse(now); // 文件存放路径
			},
			uploadUrl: function () {
				return '/data/upload' + Date.parse(now);
			},
		})(req, res, next);
	});
	jqupload.on('begin', function (fileInfo, req, res) {
		console.log(fileInfo);
	});

	// funcs-jquery-upload 路由
	router.get('/funcs/jquery-upload', function (req, res) {	
		res.render('funcs/jquery-upload', {
			title: 'funcs-jquery-upload',
			disp: 'name',
			year: now.getFullYear(),
			month: now.getMonth() + 1
		});
	});
};
