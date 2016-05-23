import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.

export default class PdfScraper {

	public scrapeText(pdfFileUrl: string, password: string): any {
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

			return Promise.all(pageScrapingPromises);
		}); 
	}

	private scrapePageText(page: PDFPageProxy): any {
		return page.getTextContent().then(textContent => {
			return textContent.items.map(item => {
				return item.str;
			});
		});
	}
}