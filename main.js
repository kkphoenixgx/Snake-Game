const {app, BrowserWindow} = require('electron')
let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    minWidth: 913,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  mainWindow.on('closed',  () => { mainWindow = null })
}

// Electron `app` is ready
app.on('ready', createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (mainWindow === null) createWindow() })