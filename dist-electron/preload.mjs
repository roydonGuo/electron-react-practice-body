let electron = require("electron");
//#region electron/preload.ts
electron.contextBridge.exposeInMainWorld("electronAPI", {
	platform: process.platform,
	versions: {
		node: process.versions.node,
		chrome: process.versions.chrome,
		electron: process.versions.electron
	},
	send: (channel, data) => {
		electron.ipcRenderer.send(channel, data);
	},
	on: (channel, callback) => {
		electron.ipcRenderer.on(channel, (_event, ...args) => callback(...args));
	}
});
//#endregion
