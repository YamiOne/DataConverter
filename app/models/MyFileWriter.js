"use strict";
var fs = require('fs');
class MyFileWriter {
    constructor() {
    }
    write(path, data) {
        fs.writeFile(path, data, function (err) {
            if (err)
                return console.log(err);
            console.log("The file was saved!");
        });
    }
}
exports.MyFileWriter = MyFileWriter;
