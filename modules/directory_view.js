//TODO
// Needs some heavy handed refactoring

// Takes in an array of directories and or files 
// and returns the HTML for them to be displayed
// on the GUI
module.exports = function(directory) {
    var html = "";

    html += "<h2>" + directory.name + "</h2>";
    if (directory.parent != "root")
        html += "<input type='button' id='" + directory.name + "' class='dir-button btn' onclick='dirClick(this)' value='Back'>";

    if (directory.children != [])
        directory.children.forEach((item) => {
            if (item.type == "folder") html += makeDirectory(item.name);
            else if (item.type == "file") html += makeFile(item.name);
        });

    return html;
};

function makeDirectory(name) {
    return "<input type='button' class='dir-button btn' onclick='dirClick(this)' value='" + name + "'>";
}

function makeFile(name) {
    return "<input type='button' class='file-button btn' onclick='fileClick(this)' value='" + name + "'>";
}