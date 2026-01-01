// main.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#ffffff',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(process.cwd(), 'public', 'icons', 'app-icon.png'), // ضع أيقونة هنا لو موجودة
  });

  win.once('ready-to-show', () => win.show());

  if (isDev) {
    // شغّل على dev server بتاع Vite
    win.loadURL('http://localhost:5173').catch(console.error);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    // بعد البناء، اقرأ من dist
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    win.loadFile(indexPath).catch(console.error);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // في ويندوز ولينكس نقفل التطبيق
  if (process.platform !== 'darwin') app.quit();
});
