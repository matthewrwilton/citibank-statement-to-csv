import * as PDFJS from "pdfjs-dist"; // Imports a global PDFJS object.
import PasswordException from "./PasswordException";
import PdfScrapingResult from "./PdfScrapingResult";

export default class PdfScraper {

	public scrapeText(pdfFileUrl: string, password: string): Promise<PdfScrapingResult> {
		let getDocumentPdfPromise = PDFJS.getDocument({
			url: pdfFileUrl,
			password: password
		});

		return Promise.resolve(getDocumentPdfPromise).then(
			pdfDocument => this.scrapePdfPages(pdfDocument),
			error => this.handleDocumentError(error)
		);
	}

	private isPasswordException(error: any): error is PasswordException {
		return (<PasswordException>error).name === "PasswordException";
	}

	private handleDocumentError(error: any): PdfScrapingResult {
		if (this.isPasswordException(error)) {
			switch (error.code) {
				case PasswordResponses.NeedPassword: return PdfScrapingResult.errorPasswordRequired();
				case PasswordResponses.PasswordIncorrect: return PdfScrapingResult.errorPasswordIncorrect();
			}
		}
		
		throw error;
	}

	private scrapePdfPages(pdfDocument: PDFDocumentProxy): Promise<PdfScrapingResult> {
		let pageScrapingPromises = [];

		// NOTE: that PdfDocument.getPage(number) is 1 based.
		for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
			let pageScrapingPromise = Promise.resolve(pdfDocument.getPage(pageNum))
				.then(page => this.scrapePageText(page));
			pageScrapingPromises.push(pageScrapingPromise);
		}

		return Promise.all(pageScrapingPromises)
			.then(pages => PdfScrapingResult.success([].concat(...pages)));
	}

	private scrapePageText(page: PDFPageProxy): Promise<string[]> {
		return Promise.resolve(page.getTextContent())
			.then(textContent => { return textContent.items.map(item => { return item.str; });
		});
	}
}

// https://github.com/mozilla/pdf.js/blob/70b3eea4a3280aa860569438aebf6efb9a976542/src/shared/util.js#L357
const enum PasswordResponses {
	NeedPassword = 1,
	PasswordIncorrect = 2
}
