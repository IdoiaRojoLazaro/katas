import { MartianGrid } from '../core/MartianGrid';
import { Coordinates, Direction, directions } from '../types';

export class Navigator {
	private constructor(
		private position: Coordinates,
		private direction: Direction,
		private planet: MartianGrid
	) {}

	static create(position: Coordinates, direction: Direction, planet: MartianGrid) {
		const [x, y] = position;
		if (x < 0 || y < 0 || x > planet.maxLongitude() || y > planet.maxLatitude()) {
			throw new Error('Coordinates are outside of the grid');
		}
		if (!directions.includes(direction)) {
			throw new Error('Invalid direction');
		}

		return new Navigator(position, direction, planet);
	}
	currentCoordinates(): Coordinates {
		return this.position;
	}
	currentDirection(): Direction {
		return this.direction;
	}

	moveForward(): Navigator {
		const [x, y] = this.position;
		let newPosition: Coordinates;
		switch (this.direction) {
			case Direction.N:
				newPosition = this.planet.nextLatitude([x, y]);
				break;
			case Direction.E:
				newPosition = this.planet.nextLongitude([x, y]);
				break;
			case Direction.S:
				newPosition = this.planet.previousLatitude([x, y]);
				break;
			case Direction.W:
				newPosition = this.planet.previousLongitude([x, y]);
				break;
		}
		return new Navigator(newPosition, this.direction, this.planet);
	}

	turnLeft() {
		const index = directions.indexOf(this.direction);
		this.direction = directions[(index - 1 + directions.length) % directions.length];
	}

	turnRight() {
		const index = directions.indexOf(this.direction);
		this.direction = directions[(index + 1) % directions.length];
	}
}
