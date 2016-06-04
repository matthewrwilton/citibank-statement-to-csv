/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import StatementParser from "./StatementParser";

describe("StatementParser", function() {
	describe("Parse", function() {
		it("returns an empty array when input is not a statement", function() {
			let input = [
				["This is not a statement."]
			];
			let target = new StatementParser();

			let expected = [];
			let actual = target.Parse(input);

			expect(actual).toEqual(expected);
		});
	});
});