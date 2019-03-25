'use strict';

var utils = require('../utils/writer.js');
var News = require('../service/NewsService');

module.exports.addNewsItem = function addNewsItem (req, res, next) {
  var body = req.swagger.params['body'].value;
  News.addNewsItem(body)
    .then(function (response) {
      	News.getAllNewsItems()
    	.then(function (response) {
	      res.json(response);
	    });
    })
    .catch(function (response) {
      res.json(response);
    });
};

module.exports.updateNewsItem =  function updateNewsItem (req, res, next) {
  const newsId = req.swagger.params['newsId'].value;
  const body = req.swagger.params['body'].value;
  News.updateNewsItem(body, newsId)
    .then(function (response) {
    	News.getAllNewsItems()
    	.then(function (response) {
	      res.json(response);
	    });
    })
    .catch(function (response) {
      res.json(response);
    });
};

module.exports.deleteNewsItem = function deleteUser (req, res, next) {
  var newsId = req.swagger.params['newsId'].value;
  News.deleteNewsItem(newsId)
    .then(function (response) {
      	News.getAllNewsItems()
    	.then(function (response) {
	      res.json(response);
	    });
    })
    .catch(function (response) {
      res.json(response);
    });
};

module.exports.getAllNewsItems = function getAllNewsItems (req, res, next) {
  const order = req.swagger.params['sortType'].value;

  const orderType = order === 1 ? 'desc': 'asc';

  News.getAllNewsItems( orderType )
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
};


module.exports.getNewsById = function getNewsById (req, res, next) {
  const newsId = req.swagger.params['newsId'].value;
  News.getNewsById(newsId)
    .then(function (response) { 
    	res.json(response);
    })
    .catch(function (response) {
    	res.json(response);
    });
};