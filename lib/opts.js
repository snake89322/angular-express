exports.exphbs = {
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
		// handlebars段落定义
    section: function (name, options) {
      if ( !this._sections ) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
		// 静态资源路径定义
    static: function (name) {
    	return require('./static.js').map(name);
    }
  }
}

exports.mongo = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
