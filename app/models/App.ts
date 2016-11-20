import { MyFileReader } from "./MyFileReader";
import { DataConverter } from "./DataConverter";
import { FileValidator } from "./FileValidator";
import { MyFileWriter } from "./MyFileWriter";

export class App {
    data: string[];
    resultingJSON: any[] = [];
    resultingXML: any[] = [];
    invalidItems: any[] = [];
    invalidItemsXML: any[] = [];
    validationStates: boolean[] = [];
    fileReader: MyFileReader;
    fileWriter: MyFileWriter;
    dataConverter: DataConverter;
    fileValidator: FileValidator;

    constructor(){
        this.fileReader = new MyFileReader();
        this.fileWriter = new MyFileWriter();
        this.dataConverter = new DataConverter();
        this.fileValidator = new FileValidator();
        this.main();
    }

    async main(){
        try {
            this.data = await this.fileReader.read('app/assets/hotels.csv');
            // JSON results
            this.resultingJSON = this.dataConverter.convertCSVToJSON(this.data);
            this.invalidItems = this.validateData(this.resultingJSON);
            // XML results
            this.resultingXML = this.dataConverter.convertJSONtoXML(this.resultingJSON);
            this.invalidItemsXML = this.dataConverter.convertJSONtoXML(this.invalidItems);

            // Writing files
            this.fileWriter.write('app/assets/hotels.json', JSON.stringify(this.resultingJSON));
            this.fileWriter.write('app/assets/hotels.xml', this.resultingXML);
            // Writing invalid items to file
            if (this.invalidItems.length > 0) {
                this.fileWriter.write('app/assets/hotels_invalid.json', JSON.stringify(this.invalidItems));
                this.fileWriter.write('app/assets/hotels_invalid.xml', this.invalidItemsXML);
            }
        } catch (err){
            console.log(err);
        }
    }

    /*
     * Looping through the array of objects and validating desired elements
     * against rules.
     */
    validateData(data: any[]): any[] {
        let invalidItems = [];
        this.resultingJSON.forEach((item) => {
            this.validationStates.push(this.fileValidator.validate(item.name, 'ascii'));
            this.validationStates.push(this.fileValidator.validate(item.stars, 'rating'));
            this.validationStates.push(this.fileValidator.validate(item.uri, 'url'));
            /*
             * Checking if all validation is passed; If any element (name, url, rating) got false
             * on validation, it is pushed into invalidItems array.
             */
            if (this.validationStates.some((element) => { return element == false })) invalidItems.push(item);
            this.validationStates = [];
        });
        return invalidItems;
    }
}
