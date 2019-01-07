let $ = require('jquery')

const {ipcRenderer} = require('electron')

// Async message handler
ipcRenderer.on('recieve-file', (event, arg) => {
    $('#main-content').html(arg);
})

// Async message sender
ipcRenderer.send('read-file', 'html')