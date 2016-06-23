import * as $ from "jquery";
import PdfScraper from "./PdfScraping/PdfScraper";
import CsvConverter from "./Statements/Converting/CsvConverter";
import StatementParser from "./Statements/Parsing/StatementParser";

const retryButtonSelector = "#retry-button";
const filePickerSelector = "#statement-file-picker";
const passwordSectionSelector = "#password-section";
const passwordInputLabelSelector = "#password-input-label";
const passwordInputSelector = "#password-input";

$(filePickerSelector).on("change", convertPdf);
$(retryButtonSelector).click(convertPdf);

function convertPdf() {
    let filePicker = <HTMLInputElement>$(filePickerSelector).get(0),
        password = (<HTMLInputElement>$(passwordInputSelector).get(0)).value,
        pdfScraper = new PdfScraper();

    if (filePicker.files.length == 0) {
        clearAndHidePasswordInput();
        return;
    }

    let pdfFile = filePicker.files[0];
    pdfScraper.scrapeText(window.URL.createObjectURL(pdfFile), password).then(result => {
        if (result.successful) {
            let statementParser = new StatementParser(),
                statementItems = statementParser.parse(result.text),
                csvConverter = new CsvConverter(),
                csvContent = csvConverter.convert(statementItems).join("\r\n"),
                encodedCsvContent = encodeURIComponent(csvContent);

            downloadCsv(pdfFile.name, encodedCsvContent);

            clearAndHidePasswordInput();
        }
        else if (result.passwordRequired) {
            showPasswordRequiredError();
        }
        else if (result.passwordIncorrect) {
            showIncorrectPasswordError();
        }
    });
}

function downloadCsv(pdfFileName: string, encodedCsvContent: string) {
    let downloadLink = document.createElement("a"),
        csvUri = "data:text/csv;charset=utf-8," + encodedCsvContent,
        filename = `${pdfFileName.substring(0, pdfFileName.lastIndexOf(".pdf"))}.csv`;

    // A link is created instead of redirecting to the URI so that a filename can be set.
    // Setting the href to the URI and download to the filename comes from FileSaver.js (via StackOverflow).
    downloadLink.href = csvUri;
    downloadLink.style.cssText = "visibility: hidden";
    downloadLink.download = filename;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function clearAndHidePasswordInput() {
    $(passwordSectionSelector).hide();
    (<HTMLInputElement>$(passwordInputSelector).get(0)).value = "";
}

function showPasswordRequiredError() {
    $(passwordInputLabelSelector).text("Statement password required");
    $(passwordSectionSelector).show();
}

function showIncorrectPasswordError() {
    $(passwordInputLabelSelector).text("Incorrect password");
    (<HTMLInputElement>$(passwordInputSelector).get(0)).value = "";
    $(passwordSectionSelector).show();
}