# csv-citibank-statement
Parse a Citibank credit card statement into a tab separated CSV file.

## Backstory
I track my credit card charges, but PDF files are terrible for extracting data from. Like any good (lazy) developer I looked to auomate my process of copying the data and running it through regular expressions before pasting it into a spreadsheet (even if it turns out like [xkcd 1319](http://xkcd.com/1319/)).

## How it works
The application is simply a web page, where you choose a PDF file to convert. The conversion occurs on the client using pdf.js.
