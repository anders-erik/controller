const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')

const fs = require('fs');

const devicePath = '/dev/ttyACM0';
const device = fs.createReadStream(devicePath, { encoding: 'utf-8' });


let buttonInterval;
let buttonString = "aaa";
device.on('data', (data) => {
    // console.log(`${data.trim()}`);
    
    buttonString = `${data.trim()}`;

    // console.log(`Received: ${data.trim()}`);
});

device.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});

device.on('close', () => {
    console.log(`Device ${devicePath} closed.`);
});



let mainWindow
function createWindow () {
    mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
    })

    // mainWindow.webContents.send('button-string', buttonString)
    // Send button string
    buttonInterval = setInterval(() => {
        // console.log("s");
        mainWindow.webContents.send('button-string', buttonString)
    }, 100 )


    const menu = Menu.buildFromTemplate([
    {
        label: app.name,
        submenu: [
        {
            click: () => mainWindow.webContents.send('update-counter', 1),
            label: 'Increment'
        },
        {
            click: () => mainWindow.webContents.send('update-counter', -1),
            label: 'Decrement'
        },
        {
            click: () => mainWindow.webContents.send('button-string', "aba"),
            label: 'Button String'
        }
        ]
    }

    ])

    Menu.setApplicationMenu(menu)

    mainWindow.loadFile('index.html')

    // mainWindow.webContents.openDevTools()
    // mainWindow.webContents.send('button-string', buttonString)
}

app.whenReady().then(() => {
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
      })

    createWindow()
    

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    // Important or A LOT OF ERRORS will be showed in your face
    clearInterval(buttonInterval);

    if (process.platform !== 'darwin') {
        app.quit()
    }
})