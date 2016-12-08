// 关于stream流的，玩不转
// readable.pause(); 和 pipe()配合并不是预想的同步

var fs = require('fs');

// method: 确认目录是否存在
exports.ensureDirExist = function () {
  if ( arguments.length === 0 ) return false;
  for (var i = 0; i < arguments.length; i++) {
    fs.existsSync(arguments[i]) || fs.mkdirSync(arguments[i]);
  }
  return true;
};

// class: File构造函数
function File (file) {
  this.name = file.name;
  this.path = file.path;
  this.rs = null;
  this.ws = null;
};

File.prototype.transfer = function (desPath, enDatemark) {
  var transDesPath, rs, ws;
  if (enDatemark) {
    var datemark = Date.parse(new Date());
    transDesPath = desPath + '/' + datemark + this.name;
  } else {
    transDesPath = desPath + '/' + this.name;
  }
			
	// fs.renameSync(file.path, desPath + '/' + file.name); // 权限有限制
  
  // 创建node stream对象readable & writable
  this.rs = fs.createReadStream(this.path);
  this.ws = fs.createWriteStream(transDesPath);

  // readable.pipe(destination[, options])
  this.rs.pipe(this.ws);

  this.rs.on("data", function (chunk) {
    console.log('got %d bytes of data', chunk.length);
  });

  this.rs.on("readable", function () {
    console.log('readable:', this.rs.read());
  }.bind(this));
};

File.prototype.pause = function () {
  // 暂停操作
  console.log('file: '+ this.name + ' pause transfer.');
  this.rs.pause();
  this.rs.unpipe(this.ws);
};

File.prototype.resume = function () {
  // 继续操作
  console.log('文件: '+ this.name + ' resume transfer.');
  this.rs.pipe(this.ws);
  this.rs.resume();
};

File.prototype.end = function (callback) {
  this.rs.on("end", function() {
  // Operation done
    console.log('文件句柄停止');
    fs.unlinkSync(this.path);
  }.bind(this));
}

exports.File = File;