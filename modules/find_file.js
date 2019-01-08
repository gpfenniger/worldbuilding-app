var fileList = require('../files/file_list.json');
var foundFile = undefined;

module.exports = function(arg) {
    foundFile = undefined;

    findFile(arg.filename, fileList);
    return foundFile.filename;
}

function findFile(name, folder) {
    if (folder != undefined) {
        if (folder.children != undefined && folder.children != []) {
            folder.children.forEach((child) => {            // Looks at children of current folder first
                if (child.type == "file") {
                    if (child.name == name) {
                        console.log("Found " + child.name);     // If there is a match it sends it up to the global
                        foundFile = child;
                    }
                }
            });
            if (foundFile == undefined) {           // If no match is found it moves unto child folders
                folder.children.forEach((child) => {
                    if (child.type == "folder") {
                        findFile(name, child);
                    }
                })
            }
        }
    }
}