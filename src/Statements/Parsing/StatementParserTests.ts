import StatementParser from "./StatementParser";
import StatementItem from "./../StatementItem";

describe("StatementParser", () => {
	describe("parse", () => {
		it("returns an empty array when input is not a statement", () => {
			let input = [
				"This is not a statement."
			];
			let target = new StatementParser();

			let expected = [];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses a single statement item statement", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses last statement item correctly", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111"
				])
				.concat(statementEnding)
				.concat([
					"A",
					"B",
					"C",
					"D"
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses a multiple item statement", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111",
					"May 02",
					"HIJKLMN",
					"56.78",
					"11111111111111111111112"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", ""),
				new StatementItem("0000 0000 0000 0000", "May 02", "HIJKLMN", "11111111111111111111112", "56.78", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses items from multiple cards", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111",
					"Card Number 1111 1111 1111 1111",
					"May 02",
					"HIJKLMN",
					"56.78",
					"11111111111111111111112"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", ""),
				new StatementItem("1111 1111 1111 1111", "May 02", "HIJKLMN", "11111111111111111111112", "56.78", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses items across separate pages", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111"
				])
				.concat(pageEnding)
				.concat(transactionsContinuedHeader)
				.concat([
					"May 02",
					"HIJKLMN",
					"56.78",
					"11111111111111111111112"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", ""),
				new StatementItem("0000 0000 0000 0000", "May 02", "HIJKLMN", "11111111111111111111112", "56.78", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses a multi page, multi card statement", () => {
			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"May 01",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111",
					"Card Number 1111 1111 1111 1111",
					"May 02",
					"HIJKLMN",
					"56.78",
					"11111111111111111111112"
				])
				.concat(pageEnding)
				.concat(transactionsContinuedHeader)
				.concat([
					"May 03",
					"OPQ",
					"99.00",
					"11111111111111111111113",
					"Card Number 2222 2222 2222 2222",
					"May 04",
					"RSTUV",
					"10000.00",
					"11111111111111111111114"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34", ""),
				new StatementItem("1111 1111 1111 1111", "May 02", "HIJKLMN", "11111111111111111111112", "56.78", ""),
				new StatementItem("1111 1111 1111 1111", "May 03", "OPQ", "11111111111111111111113", "99.00", ""),
				new StatementItem("2222 2222 2222 2222", "May 04", "RSTUV", "11111111111111111111114", "10000.00", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it ("parses a foreign currency transaction", () => {

			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"Jun 15",
					"Foreign transaction",
					"100.00",
					"11111111111111111111111",
					"Foreign Amount 123456.00",
					"Jun 16",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "Jun 15", "Foreign transaction", "11111111111111111111111", "100.00", "Foreign Amount 123456.00"),
				new StatementItem("0000 0000 0000 0000", "Jun 16", "ABCDEFG", "11111111111111111111111", "12.34", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});

		it ("ignores international transaction fee for foreign transactions", () => {

			let input = transactionsHeader
				.concat([
					"Card Number 0000 0000 0000 0000",
					"Jun 15",
					"Foreign transaction",
					"100.00",
					"11111111111111111111111",
					"Foreign Amount 123456.00",
					"AUD 123456.00 includes International Transaction fee AUD 10.00",
					"Jun 16",
					"ABCDEFG",
					"12.34",
					"11111111111111111111111"
				])
				.concat(statementEnding);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "Jun 15", "Foreign transaction", "11111111111111111111111", "100.00", "Foreign Amount 123456.00"),
				new StatementItem("0000 0000 0000 0000", "Jun 16", "ABCDEFG", "11111111111111111111111", "12.34", "")
			];
			let actual = target.parse(input);

			expect(actual).toEqual(expected);
		});
	});
});

let transactionsHeader = [
	"Transactions",
	"Date",
	"Transaction Details",
	"Reference Number",
	"Amount"
];
let transactionsContinuedHeader = [
	"Transactions (Continued)",
	"Date",
	"Transaction Details",
	"Reference Number",
	"Amount"
];
let pageEnding = [
	"(Continued next page)"
];
let statementEnding = [
	"Closing Balance"
];