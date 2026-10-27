const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('veilApp', {
  version: () => ipcRenderer.invoke('veil:app-version')
});