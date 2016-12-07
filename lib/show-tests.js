module.exports = function (router) {
  return function(req, res, next){
    res.locals.showTests = router.get('env') !== 'production' && req.query.test === '1';
    next();
  };
};
