const config = require('./config.json')[process.env.NODE_ENV || 'dev'];

const debugData = true;
const debugResponse = true;
const debug = true;
const debugErr = true;

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const port = config.port ? config.port : 3000;
const secure = config.secure ? config.secure : false;
const origin = config.origin ? config.origin : 'http://localhost:4200';
const rootDir = config.rootDir ? config.rootDir : '';

const routeOptions = {
  env,
  port,
  secure,
  origin,
  rootDir
}

if(debug) {
  console.log('server.js: env: ', env);
  console.log('server.js: port: ', port);
  console.log('server.js: secure: ', secure);
  console.log('server.js: origin: ', origin);
  console.log('server.js: rootDir: ', rootDir);
}

/*
import node modules
*/

const express = require('express');
let app = express();
const fs = require("fs");
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');

/*
import js files
*/

const IoRouter = require('./routes/io/routes.config');
const { serverLogger } = require('./logger');

/*
global variables
*/

if(debug){
  serverLogger.info('\n\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\nSERVER RESTARTED\n\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, Http-cache-token');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

app.use(bodyParser.json());

IoRouter.routesConfig(app, routeOptions);

function errorLogger(error, req, res, next) {
  if(debugErr){
    console.log('server.js: errorLogger(): error: ', error);
    serverLogger.error(`server.js: errorLogger(): error: ${JSON.stringify(error, null, 3)}`);
  }
  next(error);
}

function failSafeHandler(error, req, res, next) {
  if(debugErr){
    serverLogger.error(`server.js: failSafeHandler(): error: ${JSON.stringify(error, null, 3)}`);
  }
  res.status(500).send(error);
}

app.use(errorLogger);
app.use(failSafeHandler);

let options = {};
let server = null;

if(secure){

  if(debug){
    console.log('server.js: secure: true');
    serverLogger.info('server.js: secure: true');
  }

  try{
    options = {
        key: fs.readFileSync('../pem/private-key.pem'),
        cert: fs.readFileSync('../crt/ssl-certificate.crt')
    };
    server = https.createServer(options, app);
  }
  catch(err){
    if(debugErr) {
      console.log('server.js: create secure server: err: ', err);
      serverLogger.error(`server.js: create secure server: err: ${JSON.stringify(err, null, 3)}`);
    }
  }

}
else{

  if(debug){
    console.log('server.js: secure: false');
    serverLogger.info('server.js: secure: false');
  }
  server = http.createServer(app);

}

if(server){
	server.listen(port, function () {
	  const host = server.address().address;
	  const port = server.address().port;
	  if(debug){
		  console.log('server.js: app.listen(): server.address(): ',server.address());
      serverLogger.info(`server.js: app.listen(): server.address(): ${JSON.stringify(server.address(), null, 3)}`);
	  }
	});
}
