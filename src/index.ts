import * as $ from "jquery";
import PdfScraper from "./PdfScraping/PdfScraper";
import CsvConverter from "./Statements/Converting/CsvConverter";
import StatementParser from "./Statements/Parsing/StatementParser";

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
            .then(pdfText => {
                let statementParser = new StatementParser();
                return statementParser.parse(pdfText);
            })
            .then(statementItems => {
                let csvConverter = new CsvConverter();
                return csvConverter.convert(statementItems);
            })
            .then(csvLines => {
                
            })
    });
});
