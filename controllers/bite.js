var BiteController = function BiteController() {};
var BiteService = require('../services/bite_service');
var _= require('lodash');
var restify = require('restify');

BiteController.createBite = function createBite(req, res, next) {

  var userId = req.params.userId || '';

  var lat = req.params.lat;

  if (!_.isNumber(lat)) {
    return next(new restify.errors.BadRequestError('latitude is not a valid number!'));
  }

  var long = req.params.long;

  if (!_.isNumber(long)) {
    return next(new restify.errors.BadRequestError('longitude is not a valid number!'));
  }

  return BiteService.saveBite(userId, lat, long)
    .then(function (response) {
      res.json(response);
      next()
    })
    .catch(function (err){
      err.statusCode = err.statusCode || 500;
      res.send(err);
      next(false);
    });

};

module.exports = BiteController;
