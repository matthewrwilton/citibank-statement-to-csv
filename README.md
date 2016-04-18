# WIP
This project is work in progress.

# csv-citibank-statement
Parse a Citibank credit card statement into a tab separated CSV file.

## Backstory
I track my credit card charges, but PDF files are terrible for extracting data from. Like any good (lazy) developer I looked to auomate my process of copying the data and running it through regular expressions before pasting it into a spreadsheet (even if it turns out like [xkcd 1319](http://xkcd.com/1319/)).

## How it works
In the root directory of the repository.

    1. tsc
    2. webpack

Open www/index.html in a web browser. The application is simply a web page, where you choose a PDF file to convert. The conversion occurs on the client using pdf.js.

# Design decisions
- This is targeted for modern browsers and compiles to ES6. No transpiling to ES5.
