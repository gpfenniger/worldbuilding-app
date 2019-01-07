const {ipcRenderer} = require('electron')

let $ = require('jquery')

// Async message handler
ipcRenderer.on('recieve-file', (event, arg) => {
    $('#main-content').html(arg);
})

// Async message sender
ipcRenderer.send('read-file', {filename: 'new'})

function handleClick() {
    ipcRenderer.send('save-file', {
        filename: "new.md",
        content: $('#main-content').html()
    })
}