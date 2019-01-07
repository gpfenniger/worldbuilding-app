const {ipcRenderer} = require('electron')

let $ = require('jquery')

// Async message handler
ipcRenderer.on('recieve-file', (event, arg) => {
    $('#main-content').html(arg);
});

ipcRenderer.on('recieve-dir', (event, arg) => {
    $('#dir-view').html(arg.content);
});

// Async message sender
ipcRenderer.send('read-file', {filename: 'new'});

ipcRenderer.send('get-dir', {current: "root", action: "this"});

function handleClick() {
    ipcRenderer.send('save-file', {
        filename: "new.md",
        content: $('#main-content').html()
    })
}

function dirClick(btn) {
    ipcRenderer.send('get-dir', {current: btn.value});
}

function fileClick() {
    alert("File Clicked!")
}