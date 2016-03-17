var request = require('request');
var md5 = require('md5');

module.exports = {
  show: show
};

function show(req, res, next) {
    var id = req.params.id;
    var ts = Date().toString();
    var hash = md5(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);

    request({
      method: 'GET',
      uri: 'http://gateway.marvel.com/v1/public/comics/' + id + '?ts=' + ts + '&apikey='+process.env.MARVEL_PUBLIC_KEY+'&hash=' + hash
    }, function (error, response, body) {
      if(error) next(error);

      if (!error && response.statusCode == 200) {
        var comic = JSON.parse(response.body).data.results[0];

        //add object of comics to view
        res.render('comics/show', { comic: comic, user: req.user });
      }
    });
}
