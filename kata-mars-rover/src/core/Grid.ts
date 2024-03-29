type Coordinates = [x: number, y: number];
export class MartianGrid {
	private constructor(
		private longitude: number,
		private latitude: number
	) {}

	static create(longitude: number, latitude: number) {
		if (longitude < 0 || latitude < 0) {
			throw new Error('Longitude and latitude must be greater than or equal to 0');
		}
		return new MartianGrid(longitude, latitude);
	}

	previousLongitude([longitude, latitude]: Coordinates): Coordinates {
		this.validateCoordinates([longitude, latitude]);
		return [longitude === 0 ? this.longitude - 1 : longitude - 1, latitude];
	}

	previousLatitude(longitude: number, latitude: number): Coordinates {
		this.validateCoordinates([longitude, latitude]);
		return [longitude, latitude === 0 ? this.latitude - 1 : latitude - 1];
	}

	nextLongitude(longitude: number, latitude: number): Coordinates {
		this.validateCoordinates([longitude, latitude]);
		return [longitude === this.longitude - 1 ? 0 : longitude + 1, latitude];
	}

	nextLatitude(longitude: number, latitude: number): Coordinates {
		this.validateCoordinates([longitude, latitude]);
		return [longitude, latitude === this.latitude - 1 ? 0 : latitude + 1];
	}

	private validateCoordinates([longitude, latitude]: Coordinates) {
		if (longitude < 0 || latitude < 0 || longitude >= this.longitude || latitude >= this.latitude) {
			throw new Error('Coordinates are outside of the grid');
		}
	}
}
