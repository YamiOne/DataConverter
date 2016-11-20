var fs = require('fs');

export class MyFileWriter implements IFileWriter {

    constructor(){}

    write(path: string, data: any):void {
        fs.writeFile(path, data, function(err: any) {
            if(err) return console.log(err);
            console.log("The file was saved!");
        });
    }
}
