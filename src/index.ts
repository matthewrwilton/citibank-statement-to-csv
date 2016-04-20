import * as $ from "jquery";
import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.
import PdfScraper from "./PdfScraping/PdfScraper";

const convertButtonSelector = "#convert-to-csv-button";
const filePickerSelector = "#statement-file-picker";

$(convertButtonSelector).click(() => {
	var filePicker = $(filePickerSelector).get(0);
    var selectedFile = (<HTMLInputElement>filePicker).files[0];
    var localFileUrl = window.URL.createObjectURL(selectedFile);
    var password = (<HTMLInputElement>$("#statement-password").get(0)).value;
    
    PDFJS.getDocument({
        url: localFileUrl,
        password: password
    }).then(pdfDocument => {
        console.log('Number of pages: ' + pdfDocument.numPages);
    });

    var pdfScraper = new PdfScraper();
});

/*
 * 
 *
 *
 * // load PDF file & extract text layer
 * var pdfReader = new PdfReader();
 * pdfReader.read().then(function (pdf) {
 *
 *   // parse text layer to extract statement items
 *   var statementParser = new StatementParser();
 *   statementParser.parse(pdf);
 * });
 *
 * save statement items as CSV
 *
 * class StatementItem {
 *     cardNumber: string;
 *     date: string;
 *     description: string;
 *     amount: string;
 * }
 *
 * class StatementParser {
 *     public parse(statementText: HTMLElement[]): StatementItem[] {
 * 
 *     }
 * }
 *
 *
 */