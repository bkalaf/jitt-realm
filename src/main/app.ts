import { app, BrowserWindow, session } from 'electron';
import * as fs from 'graceful-fs';
import { initialize, enable } from '@electron/remote/main';

let mainWindow: BrowserWindow | null;
initialize();

function devToolsPath() {
    const platformPaths =
        process.platform === 'win32'
            ? 'C:/Users/bobby/AppData/Local/Electron/extensions/fmkadmapgofadopljbjfkapdkoienihi'
            : '/home/bobby/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const versionFolder = fs.readdirSync(platformPaths)[0];
    const devToolsPath = [platformPaths, versionFolder].join('/');
    console.log(devToolsPath);
    return devToolsPath;
}
function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            zoomFactor: 1.0
        },
        width: 400,
        height: 400
    });
    const url = ['file://', __dirname, 'index.html'].join('/');
    mainWindow.loadURL(url);
}
app.whenReady()
    .then(() => {
        session.defaultSession.loadExtension(devToolsPath(), { allowFileAccess: true });
    })
    .then(() => {
        createWindow();
        enable(mainWindow!.webContents);
        mainWindow?.webContents.openDevTools();
        mainWindow?.maximize();
    });
