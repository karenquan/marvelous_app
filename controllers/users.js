var User = require("../models/user");

module.exports = {
  index: index,
  show:  show
};

function index(req, res, next) {
  // User.find({}, function(err, users) {
  //   if (err) {
  //     res.json({message: err});
  //   } else {
  //     res.render('users/index', {users: users});
  //   }
  // });

  //LOAD SAMPLE USER
  // User.remove({}, function() {
  //     User.create({
  //     name: 'Karen',
  //     facebookId: 1,
  //     lists: [{
  //       title: 'My Favorite Comics',
  //       comics: [{
  //         id: 47813,
  //         title: 'Inhuman (2014) #4',
  //         description: 'ising star RYAN STEGMAN (SUPERIOR SPIDER-MAN, WOLVERINE) joins the INHUMAN team!\nMedusa and the Inhumans get a visitor to New Attilan- THOR!',
  //         thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/53f6382ee171d.jpg'
  //       },
  //       {
  //         id: 46852,
  //         title: 'Alpha (2013) #4',
  //         description: 'Alpha and Thor team up to have a totally EXCELLENT adventure!',
  //         thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/9/60/56cb63a755b7a.jpg'
  //       }]
  //     },
  //     {
  //       title: 'Iron Man',
  //       comics: [{
  //         id: 36421,
  //         title: 'Iron Man (2013) #258.4',
  //         description: 'Micheline. Layton. Two voices that defined Iron Man come together to tell the untold story of his most dire hour - Armor Wars 2!',
  //         thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/d/30/5192646802b32.jpg'
  //       },
  //       {
  //         id: 36420,
  //         title: 'Iron Man (2013) #258.3',
  //         description: 'Micheline. Layton.',
  //         thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5189540981b44.jpg'
  //       }]
  //     }],
  //   }, function(err, user) {
  //       user.save(function(error, newUser) {
  //         if(error) console.log(error);
  //         console.log('new user created!');
  //       });
  //   });
  // });
  //END LOAD SAMPLE USER
}

function show(req, res, next) {
  User.findOne({facebookId: req.params.id}, function(err, user) {
    // console.log(user);
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.render('users/show', { user: user });
    }
  });
}
