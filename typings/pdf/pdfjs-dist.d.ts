/*
Custom definition to allow importing the webpack pdfjs-dist module.
*/

declare var PDFJS: PDFJSStatic;

declare module "pdfjs-dist" {
	export = PDFJS;
}
