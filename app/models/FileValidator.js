"use strict";
class FileValidator {
    constructor() {
        this.asciiRegex = new RegExp(/^[ -~\t\n\r]+$/, 'i');
        this.urlRegex = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
        this.ratingRegex = new RegExp(/[0-5]/);
    }
    validate(data, rule) {
        switch (rule) {
            case 'ascii':
                return this.asciiRegex.test(data);
                break;
            case 'url':
                return this.urlRegex.test(data);
                break;
            case 'rating':
                return this.ratingRegex.test(data);
                break;
            default:
                return false;
                break;
        }
    }
}
exports.FileValidator = FileValidator;
