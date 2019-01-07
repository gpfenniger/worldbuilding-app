const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path') 
fs = require('fs')
const {ipcMain} = require('electron')  
const marked = require('marked')

let win  

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 
} 

// Event handler for asynchronous incoming messages
ipcMain.on('read-file', (event, arg) => {
   fs.readFile('files/test_page.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log("File Loaded");
      event.sender.send('recieve-file', '<div>' + marked(data) + '</div>');
      console.log("File sent to frontend");
    });

   console.log(arg)
})

app.on('ready', createWindow)