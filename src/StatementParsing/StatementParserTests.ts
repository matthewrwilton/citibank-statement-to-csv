/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import StatementParser from "./StatementParser";
import StatementItem from "./StatementItem";

describe("StatementParser", () => {
	describe("Parse", () => {
		it("returns an empty array when input is not a statement", () => {
			let input = [
				"This is not a statement."
			];
			let target = new StatementParser();

			let expected = [];
			let actual = target.Parse(input);

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
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111")
			];
			let actual = target.Parse(input);

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
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111"),
				new StatementItem("0000 0000 0000 0000", "May 02", "HIJKLMN", "56.78", "11111111111111111111112")
			];
			let actual = target.Parse(input);

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
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111"),
				new StatementItem("1111 1111 1111 1111", "May 02", "HIJKLMN", "56.78", "11111111111111111111112")
			];
			let actual = target.Parse(input);

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
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111"),
				new StatementItem("0000 0000 0000 0000", "May 02", "HIJKLMN", "56.78", "11111111111111111111112")
			];
			let actual = target.Parse(input);

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
					"99",
					"11111111111111111111113",
					"Card Number 2222 2222 2222 2222",
					"May 04",
					"RSTUV",
					"10000",
					"11111111111111111111114"
				]);
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111"),
				new StatementItem("1111 1111 1111 1111", "May 02", "HIJKLMN", "56.78", "11111111111111111111112"),
				new StatementItem("1111 1111 1111 1111", "May 03", "OPQ", "99", "11111111111111111111113"),
				new StatementItem("2222 2222 2222 2222", "May 04", "RSTUV", "10000", "11111111111111111111114")
			];
			let actual = target.Parse(input);

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