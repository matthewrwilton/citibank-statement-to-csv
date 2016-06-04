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
			let input = [
				"Transactions",
				"Date",
				"Transaction Details",
				"Reference Number",
				"Amount",
				"Card Number 0000 0000 0000 0000",
				"May 01",
				"ABCDEFG",
				"12.34",
				"11111111111111111111111"
			];
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111")
			];
			let actual = target.Parse(input);

			expect(actual).toEqual(expected);
		});

		it("parses a multiple item statement", () => {
			let input = [
				"Transactions",
				"Date",
				"Transaction Details",
				"Reference Number",
				"Amount",
				"Card Number 0000 0000 0000 0000",
				"May 01",
				"ABCDEFG",
				"12.34",
				"11111111111111111111111",
				"May 02",
				"HIJKLMN",
				"56.78",
				"11111111111111111111112"
			];
			let target = new StatementParser();

			let expected = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "12.34", "11111111111111111111111"),
				new StatementItem("0000 0000 0000 0000", "May 02", "HIJKLMN", "56.78", "11111111111111111111112")
			];
			let actual = target.Parse(input);

			expect(actual).toEqual(expected);
		});
	});
});