const { app, BrowserWindow } = require('electron') 
const { join } = require('path')

const isDev = !app.isPackaged
const env = process.env.NODE_ENV || 'development'

// If development environment
if (env === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }    
}

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    }) 

    window.loadFile(join(__dirname, '../public/index.html'))
    window.on('ready-to-show', window.show)
    
    if(isDev) window.webContents.openDevTools()
}

app.whenReady().then(createWindow)