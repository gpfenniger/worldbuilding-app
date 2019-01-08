const makeDirView = require('./directory_view.js')

var fileList = require('../files/file_list.json');
var foundFile = undefined;

module.exports = function(arg) {
    var html = "";          // Intializes as empty to prevent false results
    foundFile = undefined;
 
    //console.log("Looking for " + arg.current)       // For debugging
    //console.log("Top folder is " + fileList.name)
 
    findDir(arg.current, fileList);
    if (foundFile != undefined) {
       if (arg.action == "down") html = makeDirView(foundFile); // Checks if it should just be displaying the
       else if (arg.action == "up") {                           // specified folder or going to its parent
          if (foundFile.parent != undefined) {
            console.log("Searching for " + foundFile.parent)   // If going up recalls recursive on parent name
            findDir(foundFile.parent, fileList);
            html = makeDirView(foundFile)
          } else console.log("The Found File has no parent");   // Error checking
       } else console.log("No action specified")
    } else console.log("The Found File is undefined")
 
   return html;
}
 
// Takes in the name of a folder and a folder object 
// Traverses the file list using recursion
// to find a folder matching the name
function findDir(name, current) {
    if (current != undefined) {             // Checks to make sure right type of object
        if (current.type != undefined) {
            //console.log("Comparing " + current.name + " to " + name); // For debugging   
            if (current.name == name) {
                console.log("Found clicked folder")     // Sets global variable if it finds the folder
                foundFile = current;
            } else if (current.children != undefined && current.children != []) {   // If the active folder has children it recurses
                current.children.forEach((child) => {
                if (child.type == "folder") {   // Only calls itself on children that are folders
                    findDir(name, child);
                }
                }); // Error checking
            } else console.log("Children undefined or all empty for " + current.name)
        }
    } else console.log("The folder is undefined") 
}