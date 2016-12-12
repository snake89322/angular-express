/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 */
var jqupload = require('jquery-file-upload-middleware');
var fileUtils = require('../../lib/fileUtils.js');

module.exports = function (router) {
	//确保存在目录 data
	var dataDir = process.cwd() + '/data';
	var fsDir = dataDir + '/fs';
	var now = new Date();

	fileUtils.ensureDirExist(dataDir);
	
	router.use('/upload', function (req, res, next) {
		jqupload.fileHandler({
			uploadDir: function () {
				return fsDir + Date.parse(now); // 文件存放路径
			},
			uploadUrl: function () {
				return 'app' + Date.parse(now);
			},
		})(req, res, next);
	});

	// funcs-jquery-upload 路由
	router.get('/jquery-upload', function (req, res) {	
		res.render('funcs/jquery-upload', {
			title: 'funcs-jquery-upload',
			disp: 'name',
		});
	});
};
