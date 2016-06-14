/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

import CsvConverter from "./CsvConverter";
import StatementItem from "./../StatementItem";

describe("CsvConverter", () => {
	describe("convert", () => {
		it("returns an empty array when given no statement items", () => {
			let input = [];
			let target = new CsvConverter();

			let expected = [];
			let actual = target.convert(input);

			expect(actual).toEqual(expected);
		});

		it("coverts a single statement item into a single csv line", () => {
			let input = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34")
			];
			let target = new CsvConverter();

			let expected = [
				"\"0000 0000 0000 0000\"\t\"May 01\"\t\"ABCDEFG\"\t\"11111111111111111111111\"\t\"12.34\""
			];
			let actual = target.convert(input);

			expect(actual).toEqual(expected);
		});

		it("coverts multiple items into csv lines", () => {
			let input = [
				new StatementItem("0000 0000 0000 0000", "May 01", "ABCDEFG", "11111111111111111111111", "12.34"),
				new StatementItem("1111 1111 1111 1111", "May 03", "OPQ", "11111111111111111111113", "99"),
			];
			let target = new CsvConverter();

			let expected = [
				"\"0000 0000 0000 0000\"\t\"May 01\"\t\"ABCDEFG\"\t\"11111111111111111111111\"\t\"12.34\"",
				"\"1111 1111 1111 1111\"\t\"May 03\"\t\"OPQ\"\t\"11111111111111111111113\"\t\"99\""
			];
			let actual = target.convert(input);

			expect(actual).toEqual(expected);
		});
	})
});
