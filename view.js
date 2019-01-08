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

ipcRenderer.send('get-dir', {current: "Project Name", action: "down"});

function handleClick() {
    ipcRenderer.send('save-file', {
        filename: "new",
        content: $('#main-content').html()
    })
}

function dirClick(btn) {
    if (btn.value != "Back")
        ipcRenderer.send('get-dir', {current: btn.value, action: "down"});
    else ipcRenderer.send('get-dir', {current: btn.id, action: "up"});
}

function fileClick(btn) {
    ipcRenderer.send('find-file', {filename: btn.value});
}