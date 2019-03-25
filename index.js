'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app =  express();
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let cors = require('cors');

let swaggerTools = require('swagger-tools');
let jsyaml = require('js-yaml');
let serverPort = 8080;
app.use("/newsImages", express.static(__dirname + '/uploads/news/'));

app.use(cors());

let storage = multer.diskStorage(
  {
    destination: 'uploads/news/',
    filename: function ( req, file, cb ) {
      cb( null, file.originalname );
    }
  }
);

let upload = multer( { storage: storage } );

app.post('/uploadNewsFile',upload.single( 'newsfile' ), (req, res, cb) => {
    /* ===== Upload image to directory ===== */
    let uploadStatus = 'File Upload Failed';
    let filename = 'FILE NOT UPLOADED';
    if (req.file) {
        filename = req.file.originalname;
        uploadStatus = 'File Uploaded Successfully';
    } else {
        filename = 'FILE NOT UPLOADED';
        uploadStatus = 'File Upload Failed';
    }
    const body = req.body;
    const urlToImage = {'urlToImage':`http://localhost:8080/newsImages/${filename}`};
    let data ={};
    Object.assign(body,
      urlToImage
    );

    /* ===== Save filename to database ===== */
    let News = require('./service/NewsService');
    News.uploadNewsFile(body)
    .then(function (response) {
      res.send({ status: uploadStatus, filename: `Name Of File: ${ filename }`, urlToImage : response });
    })
    .catch(function (error) {
      res.send({ status: uploadStatus, filename: `Name Of File: ${ filename }`, urlToImage });
    });
    
});

// swaggerRouter configuration

let options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
let spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
let swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
