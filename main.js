const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path') 
const marked = require('marked');
const fs = require('fs')
const {ipcMain} = require('electron')  
const findFolder = require('./modules/find_folder.js')
const findFile = require('./modules/find_file.js')
const saveFile = require('./modules/save_file.js')

let win

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 
} 

// Handles asynchronously getting file information and parsing it to html
ipcMain.on('read-file', (event, arg) => {
   loadFile(event, arg)
})

// Handles saving files by taking html and parsing it to markdown
// arg: filename, content
ipcMain.on('save-file', (event, arg) => { saveFile(arg) });

ipcMain.on('get-dir', (event, arg) => {
   event.sender.send('recieve-dir', {content: findFolder(arg)})
});

ipcMain.on('find-file', (event, arg) => {
   var f = findFile(arg);
   if (f != undefined)
      loadFile(event, {filename: f});
   else console.log("File not found");
});

function loadFile(event, arg) {
   fs.readFile('files/' + arg.filename + '.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(arg.filename + " Loaded");
      event.sender.send('recieve-file', marked(data));
      console.log("File sent to frontend");
    });
}

app.on('ready', createWindow)