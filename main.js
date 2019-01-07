const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path') 
const marked = require('marked');
const TurndownService = require('turndown')
const fs = require('fs')
const {ipcMain} = require('electron')  

let turndown = TurndownService();
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
   fs.readFile('files/' + arg.filename + '.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(arg.filename + " Loaded");
      event.sender.send('recieve-file', marked(data));
      console.log("File sent to frontend");
    });
})

// Handles saving files by taking html and parsing it to markdown
ipcMain.on('save-file', (event, arg) => {
   fs.writeFile(
      "files/" + arg.filename, 
      turndown.turndown(arg.content), 
      function(err) {
         if(err) {
            return console.log(err);
         }
         console.log("The file " + arg.filename + " was saved");
      }
   ); 
});

app.on('ready', createWindow)