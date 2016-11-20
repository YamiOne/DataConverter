var builder = require('xmlbuilder');

export class DataConverter {

    finalJSON: any[] = [];
    keys: any[] = [];
    counter: number = 0;

    constructor(){}

    convertCSVToJSON(data: string[]){
        this.counter = 0;
        this.keys = [];

        data.forEach((item) => {
            if (this.counter == 0) {
                this.keys = item;
            } else {
                let newObj: any = {};
                for (let i = 0; i < item.length; i++){
                    newObj[this.keys[i]] = item[i];
                }
                this.finalJSON.push(newObj);
            }
            this.counter++;
        });
        return this.finalJSON;
    }

    /*
     * Looping through provided JSON and creating XML file.
     */
    convertJSONtoXML(data: any[]) {
        var root = builder.create('Hotels');

        data.forEach((item) => {
            let xml_item = root.ele('Hotel');
            for (let key in item){
                xml_item.ele(key, item[key]);
            }
        });
        root.end({pretty: true});
        return root;
    }
}
