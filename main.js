const { app, BrowserWindow } = require('electron')
const path = require('path');
const usb = require('usb');
let windows = [];

const webusb = new usb.WebUSB({
    allowAllDevices: true
});

const showDevices = async () => {
    const devices = await webusb.getDevices();
    const text = devices.map(d => `${d.productName}`);
    text.unshift('Device Name\n-------------------------------------');

    windows.forEach(win => {
        if (win) {
            win.webContents.send('devices', text.join('\n'));
        }
    });
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    icon: 'images/firecci.png' ,
     webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
  })

  win.loadFile('index.html')
   windows.push(win);
    showDevices();
}

app.whenReady().then(() => {
    webusb.addEventListener('connect', showDevices);
    webusb.addEventListener('disconnect', showDevices);
  createWindow()
   app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
})

app.on('window-all-closed', () => {
    webusb.removeEventListener('connect', showDevices);
    webusb.removeEventListener('disconnect', showDevices);
    app.quit();
});

