function index(req, res, next) {
  res.render('pages/index', {user: req.user});
}

module.exports = {
  index: index
};
