"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const MyFileReader_1 = require("./MyFileReader");
const DataConverter_1 = require("./DataConverter");
const FileValidator_1 = require("./FileValidator");
const MyFileWriter_1 = require("./MyFileWriter");
class App {
    constructor() {
        this.resultingJSON = [];
        this.resultingXML = [];
        this.invalidItems = [];
        this.invalidItemsXML = [];
        this.validationStates = [];
        this.fileReader = new MyFileReader_1.MyFileReader();
        this.fileWriter = new MyFileWriter_1.MyFileWriter();
        this.dataConverter = new DataConverter_1.DataConverter();
        this.fileValidator = new FileValidator_1.FileValidator();
        this.main();
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.data = yield this.fileReader.read('app/assets/hotels.csv');
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
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /*
     * Looping through the array of objects and validating desired elements
     * against rules.
     */
    validateData(data) {
        let invalidItems = [];
        this.resultingJSON.forEach((item) => {
            this.validationStates.push(this.fileValidator.validate(item.name, 'ascii'));
            this.validationStates.push(this.fileValidator.validate(item.stars, 'rating'));
            this.validationStates.push(this.fileValidator.validate(item.uri, 'url'));
            /*
             * Checking if all validation is passed; If any element (name, url, rating) got false
             * on validation, it is pushed into invalidItems array.
             */
            if (this.validationStates.some((element) => { return element == false; }))
                invalidItems.push(item);
            this.validationStates = [];
        });
        return invalidItems;
    }
}
exports.App = App;
