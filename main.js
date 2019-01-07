const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path') 
const marked = require('marked');
const TurndownService = require('turndown')
const fs = require('fs')
const {ipcMain} = require('electron')  
const makeDirView = require('./modules/directory_view.js')

let turndown = TurndownService();
let win

var fileList = require('./files/file_list.json');
var foundFile = undefined;

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
// arg: filename, content
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

// Handles the file directory by sending html for its view
// arg: current
ipcMain.on('get-dir', (event, arg) => {
   var html;
   if (arg.current == "root") {
      html = makeDirView(fileList);
   } else {   // needs a recursive function to traverse json
      findDir(fileList[0], arg.current);
      dir = foundFile;
      if (dir != undefined) { 
         html = makeDirView(dir.children);
      } else console.log("No file found")
   }
   event.sender.send('recieve-dir', {current: arg.current, content: html});
});

//TODO
// Uses a global variable, needs to be refactored
// Recurses through the directory list to find directory children
function findDir(parent, name) {
   // For debugging purposes
   //console.log(parent.name + ' compared to ' + name)
   if (parent.name == name) {
      console.log("Found")
      foundFile = parent;  
   } else {
      parent.children.forEach((child) => {
         if (child.type == "folder")
            findDir(child, name)    // when set to return this on recurse it did not reach the top level
      })
   }
}

app.on('ready', createWindow)