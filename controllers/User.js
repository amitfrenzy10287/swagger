'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
const jwt = require('jsonwebtoken');

module.exports.createNewUser = function createNewUser(req, res, next) {
  utils.verifyToken(req, res, next);
  const body = req.swagger.params['body'].value;
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
        User.createNewUser(body)
        .then(function (response) {
          res.json(response);
        })
        .catch(function (error) {
          res.json(error);
        });
    };
  });
};

module.exports.updateUser = function updateUser(req, res, next) {
  utils.verifyToken(req, res, next);
  const username = req.swagger.params['username'].value;
  const body = req.swagger.params['body'].value;
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      User.updateUser(body,username)
      .then(function (response) {
        console.log("response",response);
        res.json(response);
      })
      .catch(function (response) {
        res.json(response);
      });
    }
  });
};

module.exports.deleteUser = function deleteUser(req, res, next) {
  utils.verifyToken(req, res, next);
  var username = req.swagger.params['username'].value;
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      User.deleteUser(username)
        .then(function (response) {
          res.json(response);
        })
        .catch(function (response) {
          res.json(response);
        });
      }
  });
};

module.exports.getAllUsers = function getAllUsers (req, res, next) {
  utils.verifyToken(req, res, next);
  const username = req.swagger.params['username'].value;
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      User.getAllUsers(username)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
      }
  });  
};

module.exports.getUsersByName = function getUsersByName (req, res, next) {
  utils.verifyToken(req, res, next);
  var username = req.swagger.params['username'].value;
  jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      debugger;
      User.loginUser(username,password)
        .then(function (response) {
          res.json(response);
        })
        .catch(function (response) {
          res.json(response);
        });
      }
  });
};

module.exports.loginUser = function loginUser (req, res, next){
  const username = req.swagger.params['username'].value;
  const password = req.swagger.params['password'].value;
  User.loginUser( username, password )
    .then(function ( response ) {
      if(response.length > 0 ){
        jwt.sign({user: response} , 'secretkey',{expiresIn:'30d'}, ( err, token )=>{
          if(err){
            res.send(err);  
          }
          res.send({token,response});
        });
      } else {
        res.send({error: 'Invalid username or password!'});
      }
    })
    .catch(function (error) {
      res.json(error);
    });
};

