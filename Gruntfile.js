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
			all: { src: 'public/qa/tdd/tests-*.js', options: { ui: 'tdd' }, }
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