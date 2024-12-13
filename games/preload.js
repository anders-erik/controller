const { contextBridge, ipcRenderer } = require('electron/renderer')


contextBridge.exposeInMainWorld('electronAPI', {
    onButtonString: (callback) => ipcRenderer.on("button-string", (_event, value) => callback(value)),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    counterValue: (value) => ipcRenderer.send('counter-value', value)
})


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })

