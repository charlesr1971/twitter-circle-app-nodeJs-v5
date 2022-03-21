"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
var url = require("url");
var io = require("./main/io");
var isPackaged = electron_1.app.isPackaged;
var debug = true;
var debugErr = true;
var win = null;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false, // false if you want to run e2e test with Spectron
        },
    });
    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, '/../node_modules/electron'))
        });
        /* win.webContents.session.webRequest.onBeforeSendHeaders(
          (details, callback) => {
            callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
          },
        );
        win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
          callback({
            responseHeaders: {
              'Access-Control-Allow-Origin': ['*'],
              ...details.responseHeaders,
            },
          });
        }); */
        win.loadURL('http://localhost:4200');
    }
    else {
        // Path when running electron executable
        var pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../dist/index.html';
        }
        win.loadURL(url.format({
            pathname: path.join(__dirname, pathIndex),
            protocol: 'file:',
            slashes: true
        }));
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    return win;
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    electron_1.app.on('ready', function () { return setTimeout(createWindow, 400); });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
io.setIsPackaged(isPackaged);
// return list of files
electron_1.ipcMain.handle('app:get-files', function () {
    return io.getFiles();
});
// listen to create twitter circle event
electron_1.ipcMain.handle('app:on-create-twitter-circle', function (event, config, useCache, backgroundColor) {
    if (useCache === void 0) { useCache = false; }
    if (backgroundColor === void 0) { backgroundColor = ''; }
    return io.createTwitterCircle(config, useCache, backgroundColor);
});
// listen to write file event
electron_1.ipcMain.handle('app:on-write-file', function (event, config) {
    return io.writeFile(config);
});
// listen to write file progress event
electron_1.ipcMain.handle('app:on-write-file-progress', function (event, layers) {
    return io.writeFileProgress(layers);
});
// listen to create twitter circle progress event
electron_1.ipcMain.handle('app:on-create-twitter-circle-progress', function (event, layers) {
    return io.createTwitterCircleProgress(layers);
});
// listen to write text event
electron_1.ipcMain.handle('app:on-write-text', function (event, config) {
    return io.writeText(config);
});
// listen to create pkg json dir event
electron_1.ipcMain.handle('app:on-create-pkg-json-dir', function (event) {
    return io.getPkgJsonDir();
});
// listen to create dirs event
electron_1.ipcMain.handle('app:on-create-dirs', function (event, userid) {
    if (userid === void 0) { userid = 0; }
    return io.createDirs(true, '', userid);
});
// listen to create settings dirs event
electron_1.ipcMain.handle('app:on-create-settings-dirs', function (event, userid) {
    if (userid === void 0) { userid = 0; }
    return io.createSettingsDirs(false, userid);
});
// listen to change settings event
electron_1.ipcMain.handle('app:on-change-settings', function (event, formData) {
    return io.changeSettings(formData);
});
// listen to load storage event
electron_1.ipcMain.handle('app:on-load-storage', function (event, jsonFileName, userid) {
    if (userid === void 0) { userid = 0; }
    return io.loadStorage(jsonFileName, userid);
});
// listen to save storage event
electron_1.ipcMain.handle('app:on-save-storage', function (event, jsonFileName, data, userid) {
    if (userid === void 0) { userid = 0; }
    return io.saveStorage(jsonFileName, data, userid);
});
//listen to read global data event
electron_1.ipcMain.handle('app:on-read-global-data', function (event) {
    return io.readGlobalData();
});
// listen to share twitter circle event
electron_1.ipcMain.handle('app:on-share-twitter-circle', function (event, filename, twitterAppConfig, message) {
    return io.shareTwitterCircle(filename, twitterAppConfig, message);
});
//listen to create global data event
electron_1.ipcMain.handle('app:on-create-global-data', function (event, data) {
    return io.createGlobalData(data);
});
//listen to create test data 1 event
electron_1.ipcMain.handle('app:on-create-test-data-1', function (event, data) {
    return io.createTestData1(data);
});
//listen to create test data 2 event
electron_1.ipcMain.handle('app:on-create-test-data-2', function (event, data) {
    return io.createTestData2(data);
});
//# sourceMappingURL=main.js.map