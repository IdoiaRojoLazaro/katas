export class Grid {
	constructor(
		private rows: number,
		private columns: number
	) {}
	lastRow() {
		return this.rows;
	}
	lastColumn() {
		return this.columns;
	}
}
