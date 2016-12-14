/**
 * @author: zehui-chen
 * 这是一个功能测试路由，用于基础功能测试
 * Ueditor 基础用法
 */
var bodyParser = require('body-parser');
var ueditor = require('ueditor');
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

module.exports = function (router) {
  
  router.use(urlencodedParser);
  router.use(jsonParser);

  // /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
  // 官方例子是这样的 serverUrl: URL + "php/controller.php"
  // 我们要把它改成 serverUrl: URL + 'ue'
  router.use(
    '/funcs/ueditor/ue',
    ueditor(path.join(process.cwd(), '/public/data'), function (req, res, next) {
      // ueditor 客户发起上传图片请求
      if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        console.log(foo.filename); //exp.png
        console.log(foo.encoding); // 7bit
        console.log(foo.mimetype); // image/png

        // 下面填写你要把图片保存到的路径 （ 以 path.join(process.cwd(), '/public/data') 作为根路径）
        var img_url = 'ueImg';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
      }
      // 客户端发起图片列表请求
      else if (req.query.action === 'listimage') {
        var dir_url = 'ueImg'; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
      }
      // 客户端发起其它请求
      else {
        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        res.redirect('/vendor/ueditor/config.json');
      }
    })
  );

  router.get('/funcs/ueditor', function (req, res) {
    res.render('funcs/ueditor', {
			title: 'funcs-ueditor',
			disp: 'ueditor',
		});
  });
};
