var request = require('request');
var md5 = require('md5');

module.exports = {
  show: show
};

function show(req, res, next) {
    var id = req.params.id;
    var ts = Date.now();
    var hash = md5(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);
    var uri = 'http://gateway.marvel.com/v1/public/comics/' + id + '?ts=' + ts + '&apikey='+process.env.MARVEL_PUBLIC_KEY+'&hash=' + hash;

    request({
      method: 'GET',
      uri:    uri,
      timeout: 119000
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var comic = JSON.parse(response.body).data.results[0];

        //add object of comics to view
        res.render('comics/show', { comic: comic, user: req.user });
      } else if (error) {
        next(error);
      } else {
        var errObject = {
          message: "Unknown status code received...",
          status:  response.statusCode,
          body:    body,
          hash:    hash,
          uri:     uri
        }
        next(errObject);
      }
    });
}
