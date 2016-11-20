export class FileValidator {

    asciiRegex = new RegExp(/^[ -~\t\n\r]+$/, 'i');
    urlRegex = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    ratingRegex = new RegExp(/[0-5]/);

    constructor(){}

    validate(data: string, rule: string) :boolean {
        switch (rule) {
            case 'ascii':
                return this.asciiRegex.test(data)
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
