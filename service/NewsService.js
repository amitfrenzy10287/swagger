'use strict';

const db = require('../db/db');

/**
 * Add a new news to publish
 * 
 *
 * body news object that needs to be added to the news to publish
 * no response value expected for this operation
 **/
exports.addNewsItem = function(data) {
  return new Promise(function(resolve, reject) {
  	let sql = "INSERT into news set ?";
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
 * Update existing news
 * 
 *
 * body news object that needs to be updated to the news to publish
 * no response value expected for this operation
 **/
exports.updateNewsItem = function(data,id) {
  return new Promise(function(resolve, reject) {
  	let sql = "UPDATE news set ? where newsId = ?";
	db.query(sql,[data, id], function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});
  });
};

/**
 * Update cover image url to table as per newsId for published news
 * 
 *
 * accets newsId to update coverImage url in table
 * no response value expected for this operation
 **/
exports.updateNewsImage = function(data,id) {
  return new Promise(function(resolve, reject) {
  	let sql = "UPDATE news set ? where newsId = ?";
	db.query(sql,[data, id], function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});
  });
};
/**
 * Delete existing news item
 * 
 *
 * accets newsId to delete news from table
 * no response value expected for this operation
 **/
exports.deleteNewsItem = function(id) {
  return new Promise(function(resolve, reject) {
  	let sql = "DELETE from news where newsId = ?";
	db.query(sql, [id], function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});
  });
};

/**
 * Get single news item by news newsId
 * 
 *
 * accets newsId to fetch single news item from table
 * respond with Object of news item of particular newsId
 **/
exports.getNewsById = function(newsId) {
  return new Promise(function(resolve, reject) {
  	let sql = "SELECT * from news where newsId=?";
	db.query(sql,[newsId], function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});
  });
}

/**
 * Get all news item by defined order (by default it is descending order by published date)
 * 
 *
 * accets order type asc | desc 
 * respond with Object of all news item by order
 **/
exports.getAllNewsItems = function(orderType) {
const type = 'desc';
if(!orderType){
	orderType = type;
}	
  return new Promise(function(resolve, reject) {
  	let sql = "SELECT *,DATE_FORMAT(published_at,'%d-%m-%Y') AS publishedDate from news order by published_at "+ orderType;
	db.query(sql, function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});
  });
}

/**
 * uploads an poster image
 * 
 *
 * Image file to upload
 * no response value expected for this operation
 **/
exports.uploadNewsFile = function(body) {
const newsId = body.newsId ? body.newsId : '';
const imgUrl = body.urlToImage ? body.urlToImage:'';			
  return new Promise(function(resolve, reject) {
    let sql = "UPDATE news set urlToImage = ? where newsId = ?";
	db.query(sql,[imgUrl, newsId], function(err, data){
		if(err){
			reject(err);
		}else{
			resolve(imgUrl);
		}
	});
  });
}


