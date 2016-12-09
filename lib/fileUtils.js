var fs = require('fs');

// method: 确认目录是否存在
exports.ensureDirExist = function () {
  if ( arguments.length === 0 ) return false;
  for (var i = 0; i < arguments.length; i++) {
    if ( !fs.existsSync(arguments[i]) ) fs.mkdirSync(arguments[i]);
  }
  return true;
};
