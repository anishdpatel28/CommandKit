const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // Menu actions
  onMenuAction: callback => ipcRenderer.on("menu-action", callback),
  removeMenuAction: callback =>
    ipcRenderer.removeListener("menu-action", callback),

  // App info
  getAppVersion: () => process.versions.electron,
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,

  // Platform info
  getPlatform: () => process.platform,
  isDev: () => process.env.NODE_ENV === "development",
});
