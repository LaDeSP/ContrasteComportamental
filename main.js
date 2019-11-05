const { app, BrowserWindow } = require("electron");



function createWindow() {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 1600,
    height: 900,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile("userIndex.html");
}

app.on("ready", createWindow);

