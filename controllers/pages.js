module.exports = {
  index: index
};

function index(req, res, next) {
  res.render('pages/index');
}
