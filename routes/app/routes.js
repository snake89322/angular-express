module.exports = function (router) {
  // 首页路由
  router.get('/', function (req, res) {
    res.render('index', {
      title: 'express-index'
    });
  });
};