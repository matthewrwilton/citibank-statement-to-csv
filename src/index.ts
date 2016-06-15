import * as $ from "jquery";
import PdfScraper from "./PdfScraping/PdfScraper";
import CsvConverter from "./Statements/Converting/CsvConverter";
import StatementParser from "./Statements/Parsing/StatementParser";

const convertButtonSelector = "#convert-to-csv-button";
const filePickerSelector = "#statement-file-picker";

$(convertButtonSelector).click(() => {
	let filePicker = $(filePickerSelector).get(0),
        pdfFiles = (<HTMLInputElement>filePicker).files,
        pdfScraper = new PdfScraper(),
        password = (<HTMLInputElement>$("#statement-password").get(0)).value;

    for (let i = 0; i < pdfFiles.length; i++) {
        let pdfFile = pdfFiles[i];
        let pdfTextPromise = pdfScraper.scrapeText(window.URL.createObjectURL(pdfFile), password)
            .then(pdfText => {
                let statementParser = new StatementParser();
                return statementParser.parse(pdfText);
            })
            .then(statementItems => {
                let csvConverter = new CsvConverter();
                return csvConverter.convert(statementItems);
            })
            .then(csvLines => {
                let csvContent = csvLines.join("\r\n"),
                    encodedCsvContent = encodeURIComponent(csvContent),
                    csvUri = "data:text/csv;charset=utf-8," + encodedCsvContent,
                    downloadLink = document.createElement("a"),
                    filename = `${pdfFile.name.substring(0, pdfFile.name.lastIndexOf(".pdf"))}.csv`;

                // A link is created instead of redirecting to the URI so that a filename can be set.
                // Setting the href to the URI and download to the filename comes from FileSaver.js (via StackOverflow).
                downloadLink.href = csvUri;
                downloadLink.style.cssText = "visibility: hidden";
                downloadLink.download = filename;

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            })
    }
});
