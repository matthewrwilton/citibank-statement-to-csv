import * as $ from "jquery";
import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.
import PdfScraper from "./PdfScraping/PdfScraper";

const convertButtonSelector = "#convert-to-csv-button";
const filePickerSelector = "#statement-file-picker";

$(convertButtonSelector).click(() => {
	let filePicker = $(filePickerSelector).get(0);
    let pdfFiles = (<HTMLInputElement>filePicker).files;
    let pdfFileLocalUrls = [];
    for (let i = 0; i < pdfFiles.length; i++) {
        pdfFileLocalUrls.push(window.URL.createObjectURL(pdfFiles[i]));
    }

    let password = (<HTMLInputElement>$("#statement-password").get(0)).value;
    
    pdfFileLocalUrls.forEach((localFileUrl) => {
        PDFJS.getDocument({
            url: localFileUrl,
            password: password
        }).then(pdfDocument => {
            console.log('Number of pages: ' + pdfDocument.numPages);
        }); 
    });

//    var pdfScraper = new PdfScraper();
//    var pdfTextAsHtml = pdfScraper.scrapeTextAsHtml();
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