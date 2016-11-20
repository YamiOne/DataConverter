var fs = require('fs');
var parse = require('csv-parse');

export class MyFileReader implements IFileReader {

    myData: string[] = [];

    constructor(){}

    read(path: string){
        return new Promise<string[]>((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(parse({delimiter: ','}))
                .on('data', (csrow: any) => {
                    this.myData.push(csrow);
                })
                .on('end', () => {
                    resolve(this.myData);
                });
        });
    }
}
