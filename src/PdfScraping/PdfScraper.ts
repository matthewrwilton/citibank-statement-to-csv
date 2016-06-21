import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.

export default class PdfScraper {

	public scrapeText(pdfFileUrl: string, password: string): Promise<string[]> {
		let getDocumentPdfPromise = PDFJS.getDocument({
			url: pdfFileUrl,
			password: password
		});

		return Promise.resolve(getDocumentPdfPromise)
			.then(pdfDocument => this.scrapePdfPages(pdfDocument));
	}

	private scrapePdfPages(pdfDocument: PDFDocumentProxy): Promise<string[]> {
		let pageScrapingPromises = [];

		// NOTE: that PdfDocument.getPage(number) is 1 based.
		for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
			let pageScrapingPromise = Promise.resolve(pdfDocument.getPage(pageNum))
				.then(page => this.scrapePageText(page));
			pageScrapingPromises.push(pageScrapingPromise);
		}

		return Promise.all(pageScrapingPromises)
			.then(pages => { return [].concat(...pages); });
	}

	private scrapePageText(page: PDFPageProxy): Promise<string[]> {
		return Promise.resolve(page.getTextContent())
			.then(textContent => { return textContent.items.map(item => { return item.str; });
		});
	}
}