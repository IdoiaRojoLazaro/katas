type Coordinates = [x: number, y: number];
export class MartianGrid {
	private constructor(
		private rows: number,
		private columns: number
	) {}

	static create(rows: number, columns: number) {
		if (rows < 0 || columns < 0) {
			throw new Error('Number of rows and columns must be greater than 0');
		}
		return new MartianGrid(rows, columns);
	}

	previousRow([x, y]: Coordinates): Coordinates {
		this.validateCoordinates([x, y]);
		return [x === 0 ? this.rows - 1 : x - 1, y];
	}

	previousColumn(x: number, y: number): Coordinates {
		this.validateCoordinates([x, y]);
		return [x, y === 0 ? this.columns - 1 : y - 1];
	}

	nextRow(x: number, y: number): Coordinates {
		this.validateCoordinates([x, y]);
		return [x === this.rows - 1 ? 0 : x + 1, y];
	}

	nextColumn(x: number, y: number): Coordinates {
		this.validateCoordinates([x, y]);
		return [x, y === this.columns - 1 ? 0 : y + 1];
	}

	private validateCoordinates([x, y]: Coordinates) {
		if (x < 0 || y < 0 || x > this.rows || y > this.columns) {
			throw new Error('Coordinates are outside of the grid');
		}
	}
}
