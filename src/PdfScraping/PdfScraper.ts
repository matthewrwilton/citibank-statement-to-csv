import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.

export default class PdfScraper {

	public scrapeText(pdfFileUrl: string, password: string): Promise<string[]> {
		return PDFJS.getDocument({
			url: pdfFileUrl,
			password: password
		}).then(pdfDocument => {
			let pageScrapingPromises = [];
			
			// NOTE: that PdfDocument.getPage(number) is 1 based.
			for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
				let pageScrapingPromise = pdfDocument.getPage(pageNum).then(this.scrapePageText);
				pageScrapingPromises.push(pageScrapingPromise);
			}

			return Promise.all(pageScrapingPromises)
				.then((pages: string[][]) => {
					return [].concat(...pages);
				});
		}); 
	}

	private scrapePageText(page: PDFPageProxy): Promise<string[]> {
		return page.getTextContent().then(textContent => {
			return textContent.items.map(item => {
				return item.str;
			});
		});
	}
}