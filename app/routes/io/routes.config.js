/*
import node modules
*/

const twitter = require("twitter-lite");

/*
import js files
*/

const io = require('../../main/io');
const { globalService } = require('../../core/services/global/global.service'); // singleton
const { DataService } = require('../../core/services/data/data.service'); // instance
const { TwitterApiService } = require('../../core/services/twitterApi/twitterApi.service'); // instance
const { serverLogger } = require('../../logger');

/*
global variables
*/

const dataService = new DataService();
const twitterApiService = new TwitterApiService();

const debugChunk = false;
const debugData = true;
const debugResponse = true;
const debug = true;
const debugErr = true;

const twitterAppConfigVersion = 1;

const twitterAppConfig = globalService.getTwitterAppConfig(twitterAppConfigVersion);

const endpointPrefix = '/api/twitter-circle/v1/app/';

exports.routesConfig = function (app, routeOptions) {

  const { env, port, secure, origin, rootDir } = routeOptions;

  if(debug){
    console.log('io/routes.config.js: twitterAppConfig: ', twitterAppConfig);
    serverLogger.info(`io/routes.config.js: twitterAppConfig: ${JSON.stringify(twitterAppConfig, null, 3)}`);
  }

  // api endpoint: /app/create-test-data-1
  // method: POST
  // description: create test data

  app.post(endpointPrefix + 'create-test-data-1', async function (req, res, next) {
    try{
      let data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-test-data-1: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-test-data-1: data: ${JSON.stringify(data, null, 3)}`);
      }
      const testData = await io.createTestData1(data);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-test-data-1: testData: ', testData);
        serverLogger.info(`io/routes.config.js: app:create-test-data-1: testData: ${JSON.stringify(testData, null, 3)}`);
      }
      res.status(200).json(testData);
    }
    catch(err){
      err.type = 'app:create-test-data-1';
      next(err);
    }
  });

  // api endpoint: /app/create-test-data-2
  // method: POST
  // description: create test data

  app.post(endpointPrefix + 'create-test-data-2', async function (req, res, next) {
    try{
      let data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-test-data-2: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-test-data-2: data: ${JSON.stringify(data, null, 3)}`);
      }
      const testData = await io.createTestData2(data);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-test-data-2: testData: ', testData);
        serverLogger.info(`io/routes.config.js: app:create-test-data-2: testData: ${JSON.stringify(testData, null, 3)}`);
      }
      res.status(200).json(testData);
    }
    catch(err){
      err.type = 'app:create-test-data-2';
      next(err);
    }
  });

  // api endpoint: /app/create-dirs
  // method: POST
  // description: create dirs

  app.post(endpointPrefix + 'create-dirs', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-dirs: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-dirs: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { userid } = data;
      const dirs = await io.createDirs(true, rootDir, userid);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-dirs: dirs: ', dirs);
        serverLogger.info(`io/routes.config.js: app:create-dirs: dirs: ${JSON.stringify(dirs, null, 3)}`);
      }
      res.status(200).json(dirs);
    }
    catch(err){
      err.type = 'app:create-dirs';
      next(err);
    }
  });

  // api endpoint: /app/create-global-data
  // method: POST
  // description: create global data

  app.post(endpointPrefix + 'create-global-data', async function (req, res, next) {
    try{
      const data = req.body;
      if(debug){
        console.log('io/routes.config.js: app:create-global-data: dataIn: ', data);
        serverLogger.info(`io/routes.config.js: app:create-global-data: data: ${JSON.stringify(data, null, 3)}`);
      }
      const globalData = await io.createGlobalData(data);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-global-data: globalData: ', globalData);
        serverLogger.info(`io/routes.config.js: app:create-global-data: globalData: ${JSON.stringify(globalData, null, 3)}`);
      }
      res.status(200).json(globalData);
    }
    catch(err){
      err.type = 'app:create-global-data';
      next(err);
    }
  });

  // api endpoint: /app/read-global-data
  // method: POST
  // description: read global data

  app.post(endpointPrefix + 'read-global-data', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:read-global-data: data: ', data);
        serverLogger.info(`io/routes.config.js: app:read-global-data: data: ${JSON.stringify(data, null, 3)}`);
      }
      const globalData = await io.readGlobalData();
      if(debugResponse){
        console.log('io/routes.config.js: app:read-global-data: globalData: ', globalData);
        serverLogger.info(`io/routes.config.js: app:read-global-data: globalData: ${JSON.stringify(globalData, null, 3)}`);
      }
      res.status(200).json(globalData);
    }
    catch(err){
      err.type = 'app:read-global-data';
      next(err);
    }
  });

  // api endpoint: /app/create-twitter-circle
  // method: POST
  // description: create twitter circle

  app.post(endpointPrefix + 'create-twitter-circle', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-twitter-circle: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-twitter-circle: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { config, useCache, backgroundColor } = data;
      const twitterCircleData = await io.createTwitterCircle(config, useCache, backgroundColor);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-twitter-circle: twitterCircleData: ', twitterCircleData);
        serverLogger.info(`io/routes.config.js: app:create-twitter-circle: twitterCircleData: ${JSON.stringify(twitterCircleData, null, 3)}`);
      }
      res.status(200).json(twitterCircleData);
    }
    catch(err){
      err.type = 'app:create-twitter-circle';
      next(err);
    }
  });

  // api endpoint: /app/write-file
  // method: POST
  // description: write file

  app.post(endpointPrefix + 'write-file', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:write-file: data: ', data);
        serverLogger.info(`io/routes.config.js: app:write-file: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { config } = data;
      const filepathArr = await io.writeFile(config);
      if(debugResponse && debugChunk){
        console.log('io/routes.config.js: app:write-file: filepathArr: ', filepathArr);
        serverLogger.info(`io/routes.config.js: app:write-file: filepathArr: ${JSON.stringify(filepathArr, null, 3)}`);
      }
      res.status(200).json(filepathArr);
    }
    catch(err){
      err.type = 'app:write-file';
      next(err);
    }
  });

  // api endpoint: /app/write-file-progress
  // method: POST
  // description: write file progress

  app.post(endpointPrefix + 'write-file-progress', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:write-file-progress: data: ', data);
        serverLogger.info(`io/routes.config.js: app:write-file-progress: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { layers } = data;
      const progressData = await io.writeFileProgress(layers);
      if(debugResponse){
        console.log('io/routes.config.js: app:write-file-progress: progressData: ', progressData);
        serverLogger.info(`io/routes.config.js: app:write-file-progress: progressData: ${JSON.stringify(progressData, null, 3)}`);
      }
      res.status(200).json(progressData);
    }
    catch(err){
      err.type = 'app:write-file-progress';
      next(err);
    }
  });

  // api endpoint: /app/create-twitter-circle-progress
  // method: POST
  // description: create twitter circle progress

  app.post(endpointPrefix + 'create-twitter-circle-progress', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-twitter-circle-progress: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-twitter-circle-progress: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { layers } = data;
      const progressData = await io.createTwitterCircleProgress(layers);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-twitter-circle-progress: progressData: ', progressData);
        serverLogger.info(`io/routes.config.js: app:create-twitter-circle-progress: progressData: ${JSON.stringify(progressData, null, 3)}`);
      }
      res.status(200).json(progressData);
    }
    catch(err){
      err.type = 'app:create-twitter-circle-progress';
      next(err);
    }
  });

  // api endpoint: /app/create-pkg-json-dir
  // method: POST
  // description: create pkg json dir

  app.post(endpointPrefix + 'create-pkg-json-dir', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-pkg-json-dir: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-pkg-json-dir: data: ${JSON.stringify(data, null, 3)}`);
      }
      const pkgJsonDir = await io.getPkgJsonDir();
      if(debugResponse){
        console.log('io/routes.config.js: app:create-pkg-json-dir: pkgJsonDir: ', pkgJsonDir);
        serverLogger.info(`io/routes.config.js: app:create-pkg-json-dir: pkgJsonDir: ${JSON.stringify(pkgJsonDir, null, 3)}`);
      }
      res.status(200).json(pkgJsonDir);
    }
    catch(err){
      err.type = 'app:create-pkg-json-dir';
      next(err);
    }
  });

  // api endpoint: /app/change-settings
  // method: POST
  // description: change settings

  app.post(endpointPrefix + 'change-settings', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:change-settings: data: ', data);
        serverLogger.info(`io/routes.config.js: app:change-settings: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { formData } = data;
      const settingsData = await io.changeSettings(formData);
      if(debugResponse){
        console.log('io/routes.config.js: app:change-settings: settingsData: ', settingsData);
        serverLogger.info(`io/routes.config.js: app:change-settings: settingsData: ${JSON.stringify(settingsData, null, 3)}`);
      }
      res.status(200).json(settingsData);
    }
    catch(err){
      err.type = 'app:change-settings';
      next(err);
    }
  });

  // api endpoint: /app/load-storage
  // method: POST
  // description: load storage

  app.post(endpointPrefix + 'load-storage', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:load-storage: data: ', data);
        serverLogger.info(`io/routes.config.js: app:load-storage: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { jsonFileName, userid } = data;
      const storageData = await io.loadStorage(jsonFileName, userid);
      if(debugResponse){
        console.log('io/routes.config.js: app:load-storage: storageData: ', storageData);
        serverLogger.info(`io/routes.config.js: app:load-storage: storageData: ${JSON.stringify(storageData, null, 3)}`);
      }
      res.status(200).json(storageData);
    }
    catch(err){
      err.type = 'app:load-storage';
      next(err);
    }
  });

  // api endpoint: /app/save-storage
  // method: POST
  // description: save storage

  app.post(endpointPrefix + 'save-storage', async function (req, res, next) {
    try{
      const _data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:save-storage: _data: ', _data);
        serverLogger.info(`io/routes.config.js: app:save-storage: data: ${JSON.stringify(_data, null, 3)}`);
      }
      const { jsonFileName, data, userid } = _data;
      const storageData = await io.saveStorage(jsonFileName, data, userid);
      if(debugResponse){
        console.log('io/routes.config.js: app:save-storage: storageData: ', storageData);
        serverLogger.info(`io/routes.config.js: app:save-storage: storageData: ${JSON.stringify(storageData, null, 3)}`);
      }
      res.status(200).json(storageData);
    }
    catch(err){
      err.type = 'app:save-storage';
      next(err);
    }
  });

  // api endpoint: /app/create-settings-dirs
  // method: POST
  // description: create settings dirs

  app.post(endpointPrefix + 'create-settings-dirs', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-settings-dirs: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-settings-dirs: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { userid } = data;
      const dirs = await io.createSettingsDirs(false, userid);
      if(debugResponse){
        console.log('io/routes.config.js: app:create-settings-dirs: dirs: ', dirs);
        serverLogger.info(`io/routes.config.js: app:create-settings-dirs: dirs: ${JSON.stringify(dirs, null, 3)}`);
      }
      res.status(200).json(dirs);
    }
    catch(err){
      err.type = 'app:create-settings-dirs';
      next(err);
    }
  });

  // api endpoint: /app/write-text
  // method: POST
  // description: write text

  app.post(endpointPrefix + 'write-text', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData && debugChunk){
        console.log('io/routes.config.js: app:write-text: data: ', data);
        serverLogger.info(`io/routes.config.js: app:write-text: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { config } = data;
      const filepath = await io.writeText(config);
      if(debugResponse){
        console.log('io/routes.config.js: app:write-text: filepath: ', filepath);
        serverLogger.info(`io/routes.config.js: app:write-text: filepath: ${JSON.stringify(filepath, null, 3)}`);
      }
      res.status(200).json(filepath);
    }
    catch(err){
      err.type = 'app:write-text';
      next(err);
    }
  });

  // api endpoint: /app/share-twitter-circle
  // method: POST
  // description: share twitter circle

  app.post(endpointPrefix + 'share-twitter-circle', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:share-twitter-circle: data: ', data);
        serverLogger.info(`io/routes.config.js: app:share-twitter-circle: data: ${JSON.stringify(data, null, 3)}`);
      }
      if(debug){
        console.log('io/routes.config.js: app:share-twitter-circle: twitterAppConfig: ',twitterAppConfig);
        serverLogger.info(`io/routes.config.js: app:share-twitter-circle: twitterAppConfig: ${JSON.stringify(twitterAppConfig, null, 3)}`);
      }
      if(env === 'production'){
        var twitterAppConfig = globalService.getTwitterAppConfig(twitterAppConfigVersion);
        const selected = (({ filename, message }) => ({ filename, message }))(data);
        if(debug){
          console.log('io/routes.config.js: app:share-twitter-circle: selected: ',selected,' twitterAppConfig: ',twitterAppConfig);
          serverLogger.info(`io/routes.config.js: app:share-twitter-circle: selected: ${JSON.stringify(selected, null, 3)}, twitterAppConfig: ,${JSON.stringify(twitterAppConfig, null, 3)}`);
        }
        var { filename, message } = selected;
      }
      else{
        var { filename, twitterAppConfig, message } = data;
      }
      if(debug){
        console.log('io/routes.config.js: app:share-twitter-circle: filename: ',filename,' twitterAppConfig: ',twitterAppConfig,' message',message);
        serverLogger.info(`io/routes.config.js: app:share-twitter-circle: filename: ${JSON.stringify(filename, null, 3)}, twitterAppConfig: ,${JSON.stringify(twitterAppConfig, null, 3)}, message: ,${JSON.stringify(message, null, 3)}`);
      }
      const success = await io.shareTwitterCircle(filename, twitterAppConfig, message);
      if(debugResponse){
        console.log('io/routes.config.js: app:share-twitter-circle: success: ', success);
        serverLogger.info(`io/routes.config.js: app:share-twitter-circle: success: ${JSON.stringify(success, null, 3)}`);
      }
      res.status(200).json(success);
    }
    catch(err){
      err.type = 'app:share-twitter-circle';
      next(err);
    }
  });

  // api endpoint: /app/create-new-twitter-client
  // method: POST
  // description: create new twitter client

  app.post(endpointPrefix + 'create-new-twitter-client', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData){
        console.log('io/routes.config.js: app:create-new-twitter-client: data: ', data);
        serverLogger.info(`io/routes.config.js: app:create-new-twitter-client: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { subdomain, extension, response } = data;
      const twitterClient = new twitter({
        subdomain,
        consumer_key: twitterAppConfig.consumerKey, // from Twitter.
        consumer_secret: twitterAppConfig.consumerSecret,
        extension, // true is the default (this must be set to false for v2 endpoints),
        access_token_key: twitterAppConfig.accessTokenKey, // from your User (oauth_token)
        access_token_secret: twitterAppConfig.accessTokenSecret, // from your User (oauth_token_secret)
        bearer_token: response ? response?.access_token : null
      });
      if(debug){
        console.log('io/routes.config.js: app:create-new-twitter-client: twitterAppConfig: ', twitterAppConfig);
        serverLogger.info(`io/routes.config.js: app:create-new-twitter-client: twitterAppConfig: ${JSON.stringify(twitterAppConfig, null, 3)}`);
      }
      if(debugResponse){
        console.log('io/routes.config.js: app:create-new-twitter-client: twitterClient: ', twitterClient);
        serverLogger.info(`io/routes.config.js: app:create-new-twitter-client: twitterClient: ${JSON.stringify(twitterClient, null, 3)}`);
      }
      res.status(200).json(twitterClient);
    }
    catch(err){
      err.type = 'app:create-new-twitter-client';
      next(err);
    }
  });

  // api endpoint: /app/read-twitter-data
  // method: POST
  // description: read twitter data

  app.post(endpointPrefix + 'read-twitter-data', async function (req, res, next) {
    try{
      const data = req.body;
      if(debugData && debugChunk){
        console.log('io/routes.config.js: app:read-twitter-data: data: ', data);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: data: ${JSON.stringify(data, null, 3)}`);
      }
      const { twitterUsername, action, useCache, useInteractions, tCurrentData, layers, maxReplacements, useReplacementLayer } = data;

      const apiClient = await io.createNewTwitterClient('api', false, null, twitterAppConfig, '1.1');

      if(debug){
        console.log('io/routes.config.js: app:read-twitter-data: apiClient: ', apiClient);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: apiClient: ${JSON.stringify(apiClient, null, 3)}`);
      }

      const apiResponse = await apiClient.getBearerToken();
      const twitterApiClient = await io.createNewTwitterClient('api', true, apiResponse, twitterAppConfig, '1.1');

      if(debug){
        console.log('io/routes.config.js: app:read-twitter-data: twitterApiClient: ', twitterApiClient);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: twitterApiClient: ${JSON.stringify(twitterApiClient, null, 3)}`);
        console.log('io/routes.config.js: app:read-twitter-data: twitterAppConfig: ', twitterAppConfig);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: twitterAppConfig: ${JSON.stringify(twitterAppConfig, null, 3)}`);
      }

      const currentUser = await twitterApiService.getUser(twitterApiClient, twitterUsername);

      if(debug){
        console.log('io/routes.config.js: app:read-twitter-data: currentUser: ', currentUser);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: currentUser: ${JSON.stringify(currentUser, null, 3)}`);
      }

      let currentData = [];

      if(useInteractions || tCurrentData.length === 0){
        currentData = await dataService.getInteractions(twitterApiClient, twitterUsername, layers, maxReplacements, useReplacementLayer);
      }

      if(debug && debugChunk){
        console.log('io/routes.config.js: app:read-twitter-data: currentData: ', currentData);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: currentData: ${JSON.stringify(currentData, null, 3)}`);
      }

      const twitterData = {
        currentUser,
        currentData
      }

      if(debugResponse){
        console.log('io/routes.config.js: app:read-twitter-data: twitterData: ', twitterData);
        serverLogger.info(`io/routes.config.js: app:read-twitter-data: twitterData: ${JSON.stringify(twitterData, null, 3)}`);
      }

      res.status(200).json(twitterData);
    }
    catch(err){
      err.type = 'app:read-twitter-data';
      next(err);
    }
  });

};
