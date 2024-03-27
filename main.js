const { app, BrowserWindow,screen } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 250,
    height: 150,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  // 窗口置顶
  win.setAlwaysOnTop(true);
  // 打开开发工具
  // win.webContents.openDevTools()
  // 获取屏幕的分辨率大小
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  // 计算窗口的位置，使其出现在屏幕的右上角
  win.setPosition(screenSize.width - 250, 70);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})