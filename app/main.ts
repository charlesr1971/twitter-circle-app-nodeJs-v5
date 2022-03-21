import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

import * as io from './main/io';

const isPackaged = app.isPackaged;

const debug = true;
const debugErr = true;

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
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
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

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
  win.on('closed', () => {
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
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

io.setIsPackaged(isPackaged);

// return list of files

ipcMain.handle( 'app:get-files', () => {
  return io.getFiles();
});

// listen to create twitter circle event

ipcMain.handle( 'app:on-create-twitter-circle', (event, config: any, useCache = false, backgroundColor = '') => {
  return io.createTwitterCircle(config, useCache, backgroundColor);
});

// listen to write file event

ipcMain.handle( 'app:on-write-file', (event, config: any) => {
  return io.writeFile(config);
});

// listen to write file progress event

ipcMain.handle( 'app:on-write-file-progress', (event, layers: any) => {
  return io.writeFileProgress(layers);
});

// listen to create twitter circle progress event

ipcMain.handle( 'app:on-create-twitter-circle-progress', (event, layers: any) => {
  return io.createTwitterCircleProgress(layers);
});

// listen to write text event

ipcMain.handle( 'app:on-write-text', (event, config: any) => {
  return io.writeText(config);
});

// listen to create pkg json dir event

ipcMain.handle( 'app:on-create-pkg-json-dir', (event) => {
  return io.getPkgJsonDir();
});

// listen to create dirs event

ipcMain.handle( 'app:on-create-dirs', (event, userid: number = 0) => {
  return io.createDirs(true, '', userid);
});

// listen to create settings dirs event

ipcMain.handle( 'app:on-create-settings-dirs', (event, userid: number = 0) => {
  return io.createSettingsDirs(false, userid);
});

// listen to change settings event

ipcMain.handle( 'app:on-change-settings', (event, formData: any) => {
  return io.changeSettings(formData);
});

// listen to load storage event

ipcMain.handle( 'app:on-load-storage', (event, jsonFileName: any, userid: number = 0) => {
  return io.loadStorage(jsonFileName, userid);
});

// listen to save storage event

ipcMain.handle( 'app:on-save-storage', (event, jsonFileName: any, data: any, userid: number = 0) => {
  return io.saveStorage(jsonFileName, data, userid);
});

//listen to read global data event

ipcMain.handle( 'app:on-read-global-data', (event) => {
  return io.readGlobalData();
});

// listen to share twitter circle event

ipcMain.handle( 'app:on-share-twitter-circle', (event, filename: any, twitterAppConfig: any, message: any) => {
  return io.shareTwitterCircle(filename, twitterAppConfig, message);
});

//listen to create global data event

ipcMain.handle( 'app:on-create-global-data', (event, data: any) => {
  return io.createGlobalData(data);
});

//listen to create test data 1 event

ipcMain.handle( 'app:on-create-test-data-1', (event, data: any) => {
  return io.createTestData1(data);
});

//listen to create test data 2 event

ipcMain.handle( 'app:on-create-test-data-2', (event, data: any) => {
  return io.createTestData2(data);
});
