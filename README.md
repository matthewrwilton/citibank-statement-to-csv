# Convert Citibank credit card statements to CSV

## Purpose
Citibank credit card statements come as PDFs, which is not a great format for data. This application extracts the statement data from the PDF and creates a CSV file of all the transactions.

## How it works
It runs entirely in your browser, no data is sent over the internet. Choose the PDF statement and your browser will save a CSV copy of the statement to your PC.

## To use
Visit http://matthewrwilton.github.io/citibank-statement-to-csv/

## Limitations
The application uses modern browser functionality and will not work in older out of date browsers. Use Chrome.

## Development
Clone the repository. Checkout the master branch.

Running "npm run-script build" or "webpack" will build the application using webpack. To build on changes run "npm run-script watch".

Tests can be run with "npm test". For a continuous test runner use "npm run-script test-debug".
