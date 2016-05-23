import * as $ from "jquery";
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

    let pdfScraper = new PdfScraper();
    pdfFileLocalUrls.forEach(localFileUrl => {
        let pdfTextPromise = pdfScraper.scrapeText(localFileUrl, password)
            .then(text => {
                console.log(text);
            });
    });
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