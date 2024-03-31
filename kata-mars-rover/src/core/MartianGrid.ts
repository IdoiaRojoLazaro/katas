type Coordinates = [x: number, y: number];
export class MartianGrid {
	private constructor(
		private boundaryLatitude: number,
		private boundaryLongitude: number
	) {}

	static create(boundaryLongitude: number, boundaryLatitude: number) {
		if (boundaryLongitude < 0 || boundaryLatitude < 0) {
			throw new Error('x and y must be greater than or equal to 0');
		}
		return new MartianGrid(boundaryLongitude, boundaryLatitude);
	}

	maxLongitude(): number {
		return this.boundaryLatitude;
	}

	maxLatitude(): number {
		return this.boundaryLongitude;
	}

	previousLongitude([x, y]: Coordinates): Coordinates {
		return [this.calculatePreviousCoordinate(x, this.boundaryLongitude), y];
	}

	previousLatitude([x, y]: Coordinates): Coordinates {
		return [x, this.calculatePreviousCoordinate(y, this.boundaryLatitude)];
	}

	nextLongitude([x, y]: Coordinates): Coordinates {
		return [this.calculateNextCoordinate(x, this.boundaryLongitude), y];
	}

	nextLatitude([x, y]: Coordinates): Coordinates {
		return [x, this.calculateNextCoordinate(y, this.boundaryLatitude)];
	}

	private calculatePreviousCoordinate(coord: number, maxCoord: number): number {
		this.validateCoordinates([coord, 0]);
		return coord === 0 ? maxCoord - 1 : coord - 1;
	}

	private calculateNextCoordinate(coord: number, maxCoord: number): number {
		this.validateCoordinates([coord, 0]);
		return coord === maxCoord - 1 ? 0 : coord + 1;
	}

	private validateCoordinates([x, y]: Coordinates) {
		if (x < 0 || y < 0 || x >= this.boundaryLongitude || y >= this.boundaryLatitude) {
			throw new Error('Coordinates are outside of the grid');
		}
	}
}
