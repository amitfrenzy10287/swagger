let ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

exports.verifyToken = function verifyToken(req, res, next) {
  //Get the auth header value
  const bearerToken = req.headers['access_token'];
  //check if bearer is undefined
  if(typeof bearerToken!== 'undefined'){
    //Set the token
    return req.token = bearerToken;

  }else{
    res.sendStatus(403);  
  }
};


let writeJson = exports.writeJson = function(response, arg1, arg2) {
  let code;
  let payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}
