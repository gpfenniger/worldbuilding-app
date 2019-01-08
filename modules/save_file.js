const TurndownService = require('turndown');
const fs = require('fs');

let turndown = TurndownService();

module.exports = function(arg) {
    fs.writeFile(
        "files/" + arg.filename + ".md", 
        turndown.turndown(arg.content),     // converts from HTML to Markdown
        function(err) {
            if(err)
                return console.log(err);
            console.log("The file " + arg.filename + " was saved");
        }
    ); 
}