var $ = require("jquery");
require('pdfjs-dist'); // Imports a global PDFJS object.

function loadFileTest() {
    var filePicker = $("#statement-file-picker").get(0);
    var selectedFile = filePicker.files[0];
    var localFileUrl = window.URL.createObjectURL(selectedFile);
    PDFJS.getDocument(localFileUrl).then(function (pdfDocument) {
        console.log('Number of pages: ' + pdfDocument.numPages);
    });
}

document.getElementById("convert-to-csv-button").onclick = loadFileTest;

/*
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
 */