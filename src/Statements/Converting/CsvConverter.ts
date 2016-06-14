import StatementItem from "./../StatementItem";

export default class CsvConverter {

	public convert(statementItems: StatementItem[]): string[] {
		return statementItems.map(item => {
			return `\"${item.cardNumber}\"\t\"${item.date}\"\t\"${item.transactionDetails}\"\t\"${item.referenceNumber}\"\t\"${item.amount}\"`;
		});
	}
}
