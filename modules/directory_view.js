

// Takes in an array of directories and or files 
// and returns the HTML for them to be displayed
// on the GUI
module.exports = function(directoryArray) {
    var html = "";

    //console.log(directoryArray)

    if (directoryArray != [])
        directoryArray.forEach((item) => {
            if (item.type == "folder") html += makeDirectory(item.name);
            else if (item.type == "file") html += makeFile(item.name);
        });

    return html;
};

function makeDirectory(name) {
    return "<input type='button' class='dir-button' onclick='dirClick(this)' value='" + name + "'>";
}

function makeFile(name) {
    return "<input type='button' type='file-button' onclick='fileClick(this)' value='" + name + "'>";
}