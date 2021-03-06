// 基础引用
var express = require('express');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');

// 配置
var app = express();
var opts = require('./lib/opts.js');

// 设置handlebars视图引擎
var exphbs = require('express-handlebars').
             create(opts.exphbs);

// 引用证书文件
var credentials = require('./credentials.js');

// express设置&中间件
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('./lib/use/show-tests.js')(app));

// 环境配置
// switch (app.get('env')) {
// 	case 'development':
// 		mongoose.connect(credentials.mongo.development.connectionString, opts.mongo);
// 		break;
// 	case 'production':
//     app.enable('view cache');
// 		mongoose.connect(credentials.mongo.production.connectionString, opts.mongo);
// 		break;
// 	default:
// 		throw new Error('Unknown execution environment: ' + app.get('env'));
// }

// 路由
require('./routes/app/routes.js')(app); // 主域名路由

require('./routes/app/funcs/formidable-upload.js')(app); // 功能测试专用路由 非必要
require('./routes/app/funcs/jquery-upload.js')(app); // 功能测试专用路由 非必要
require('./routes/app/funcs/angular-upload.js')(app); // 功能测试专用路由 非必要
require('./routes/app/funcs/ueditor.js')(app); // 功能测试专用路由 非必要

// 404阀
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// 500阀
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
 
// 应用集群扩展
if (require.main === module) {
  // 单线程
  startServer();
} else {
  // 多线程
  module.exports = startServer;
} 

function startServer () {
	http.createServer(app).listen(app.get('port'), function () {
		console.log( 'Express started in ' + app.get('env') +
		' mode on http://localhost:' + app.get('port') +
		'; press Ctrl-C to terminate./n' );
		console.log('Listening on port %d.', app.get('port'));
	});
}