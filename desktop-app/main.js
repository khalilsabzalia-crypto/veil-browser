const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Veil Browser',
    backgroundColor: '#101411',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  // Keep remote pages isolated and deny permission prompts by default.
  const ses = session.defaultSession;
  ses.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));

  win.webContents.setWindowOpenHandler(({ url }) => {
    // Do not let remote pages spawn uncontrolled app windows.
    // Users can paste a URL into Veil's address bar instead.
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  ipcMain.handle('veil:app-version', () => app.getVersion());
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});