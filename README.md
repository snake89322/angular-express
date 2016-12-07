# angular-express建站配置&流程

## 配置

* 安装[nodejs]

* 安装[git]

* .gitignore添加配置
```sh
	# ignore packages installed by npm
	node_modules
	# ignore ~ backup file
	*~
```

* Gruntfile.js配置
```sh
	module.exports = function(grunt) {
		// 加载插件
		[
			'grunt-cafe-mocha',
			'grunt-contrib-jshint',
			'grunt-exec',
		].forEach(function(task){
			grunt.loadNpmTasks(task);
		});
		// 配置插件
		grunt.initConfig({
			cafemocha: {
				all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
			},
			jshint: {
				app: ['sever.js', 'public/js/**/*.js', 'lib/**/*.js'],
				qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
			},
			exec: {
				linkchecker: { cmd: 'linkchecker --check-extern http://localhost:3000' }
			},
		});
		// 注册任务
		grunt.registerTask('test', ['cafemocha','jshint','exec']);
	};
```

## 初始化项目
>进入项目目录并进行操作

1、 创建一个Git存储库（也可用Git客户端创建）
```sh
	git init
```

2、 初始化创建 package.json文件
```sh
	npm init
```

3、 创建README.md文件
	这个文件很适合描述网站的整体架构，也适合于存放刚接触项目的人需要了解的重要信息。

4、目录结构
* lib - _用来保存模块的目录，一般都称为 lib（library 的缩写）_
* public - _放置UI相关文件_
* public/vendor _放置第三方库文件_
* public/qa _放置测试文件_
* views _放置视图模板_
* views/layouts _放置公用视图模板_
* views/partials _放置组件视图模板_
* views/other _放置other自定义视图模板_
* models _放置数据库模型_
* routes _放置express路由信息_

5、文件结构
* lib/opts.js _配置文件(包含但不限于exphbs、mongo配置)_
* lib/static.js _静态资源地址（用于exphbs及服务器静态资源地址）_
* views/layouts/main.hbs _公用模板_
* credentials.js _证书文件（邮箱、数据库、cookie）_


## NPM

* express相关
```sh
	npm install --save express
	npm install --save express-handlebars
```

* mongodb相关
```sh
 npm install --save mongoose
```

* QA相关
>测试框架，这里用的是 Mocha:
```sh
	npm install --save-dev mocha 
	mkdir public/vendor/mocha
	cp node_modules/mocha/mocha.js public/vendor/mocha
	cp node_modules/mocha/mocha.css public/vendor/mocha
```

>测试通常需要一个 assert （或 expect）函数。Node 框架中有这个函数，但浏览器中没有，所以我们要用 Chai 断言库：
>用法[mocha-tutorial-of-example](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
```sh
	npm install --save-dev chai
	mkdir public/vendor/unit-test/chai
	cp node_modules/chai/chai.js public/vendor/unit-test/chai
	// 单个测试
	$ mocha -u tdd -R spec public/qa/tdd/tests-unit.js
```

>检查死链接看起来没什么吸引力，但它对搜索引擎如何给你的网站评级却有巨大的影响。它很容易集成到你的工作流中，所以不这样做就太不明智了。
>[linkchecker下载](http://wummel.github.io/linkchecker)
```sh
	// 配置linkchecker.exe至环境变量 
	linkchecker http://localhost:3000
```

>压力测试（或负载测试）是为了让你相信服务器可以正常地应对成百上千的并发请求。
```sh
	npm install --save loadtest
```

>测试自动化
```sh
	npm install -g grunt-cli
	npm install --save-dev grunt@0.4.1
	npm install --save-dev grunt-cafe-mocha
	npm install --save-dev grunt-contrib-jshint
	npm install --save-dev grunt-exec
```
>GruntFile配置
```sh
	'grunt-cafe-mocha',
	'grunt-contrib-jshint',
	'grunt-exec',
```
```sh
	cafemocha: {
		all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
	},
	jshint: {
		app: ['sever.js', 'public/js/**/*.js', 'lib/**/*.js'],
		qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
	},
	exec: {
		linkchecker: { cmd: 'linkchecker --check-extern http://localhost:3000' }
	},
```
```sh
	grunt.registerTask('test', ['cafemocha','jshint','exec']);
```

[//]: # 
(These are reference links used in the body of this note and get stripped out when the markdown processor does its job. 
There is no need to format nicely because it shouldn't be seen. 
Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[nodejs]: <http://nodejs.org/>
[git]: <http://git-scm.com/>
