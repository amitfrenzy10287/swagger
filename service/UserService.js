'use strict';

const db = require('../db/db');

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * data User Created user object
 * no response value expected for this operation
 **/
exports.createNewUser = function(data) {
  return new Promise(function(resolve, reject) {
    let sql = "INSERT into users set ?";
    db.query(sql,[data], function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

/**
 * Get user by Id
 * This can only be done by the logged in user.
 *
 * data User Created user object
 * no response value expected for this operation
 **/
exports.getUsersByName = function(username) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT * from users where username = ?";
    db.query(sql,[username], function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

/**
 * Get all users
 * This can only be done by the logged in user.
 *
 * response object expected for this operation
 **/
exports.getAllUsers = function(body) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT * from users";
    db.query(sql, function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

/**
 * Login user and get access or auth token
 * This can only be done by regitered users.
 *
 * response token object expected for this operation
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT * from users where username=? AND password=?";
    db.query(sql,[username,password], function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(data,username) {
  return new Promise(function(resolve, reject) {
    let sql = "UPDATE users set ? where username = ?";
    db.query(sql,[data, username], function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    let sql = "DELETE from users where username = ?";
    db.query(sql, [username], function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

