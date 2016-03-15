var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var charactersController = require('../controllers/characters');
var comicsController = require('../controllers/comics');
var apiController = require('../controllers/api');

// root path:
router.get('/', pagesController.index);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// characters
router.get('/characters', charactersController.index);
router.post('/characters', charactersController.create);
router.get('/characters/:id', charactersController.show);
router.get('/characters/search/:name', charactersController.search);

// comics
router.get('/comics/:id', comicsController.show);

//api
router.post('/users/:id/lists', apiController.createList);
router.delete('/users/:id/lists/:id', apiController.destroyList);
router.post('/users/:id/lists/:id/comics', apiController.addComicToList);
router.delete('/users/:id/lists/:id/comics/:id', apiController.destroyComic);
router.get('/users/:id/lists', apiController.getUserLists);

module.exports = router;
