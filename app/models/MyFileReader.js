"use strict";
var fs = require('fs');
var parse = require('csv-parse');
class MyFileReader {
    constructor() {
        this.myData = [];
    }
    read(path) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(parse({ delimiter: ',' }))
                .on('data', (csrow) => {
                this.myData.push(csrow);
            })
                .on('end', () => {
                resolve(this.myData);
            });
        });
    }
}
exports.MyFileReader = MyFileReader;
