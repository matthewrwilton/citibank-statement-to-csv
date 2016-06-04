export default class StatementItem {
	constructor(
		public cardNumber: string,
		public date: string,
		public transactionDetails: string,
		public referenceNumber: string,
		public amount: string) {
    }
}
