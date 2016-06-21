export default class PdfScrapingResult {
	constructor(
		public successful: boolean,
		public text: string[],
		public passwordRequired: boolean,
		public passwordIncorrect: boolean) {
	}

	static success(text: string[]): PdfScrapingResult {
		return new PdfScrapingResult(true, text, false, false);
	}

	static errorPasswordRequired(): PdfScrapingResult {
		return new PdfScrapingResult(false, [], true, false);
	}

	static errorPasswordIncorrect(): PdfScrapingResult {
		return new PdfScrapingResult(false, [], false, true);
	}
}