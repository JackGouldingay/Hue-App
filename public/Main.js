const {app, BrowserWindow} = require("electron");
const path = require("path");

function createWindow() {
	// Create the browser window
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "Preload.js"),
		},
		resizable: false,
		darkTheme: true,
	});

	// load react app
	mainWindow.loadURL("http://localhost:3000");

	// remove menu
	mainWindow.removeMenu();
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
