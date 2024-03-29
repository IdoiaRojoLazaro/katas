import { Position, Direction, Command, directions } from '../types';
import { Grid } from './Grid';

export class Rover {
	constructor(
		private position: Position,
		private direction: Direction,
		private planet: Grid
	) {}

	static create(position: Position, direction: Direction, planet: Grid) {
		const [x, y] = position;
		if (x < 0 || x > planet.lastRow() || y < 0 || y > planet.lastColumn()) {
			throw new Error('Rover is outside of the planet');
		}
		return new Rover(position, direction, planet);
	}
	getPosition() {
		return `${this.position[0]}:${this.position[1]}:${this.direction}`;
	}
	move(commands: Command[]) {
		commands.forEach((command) => {
			if (command === Command.L) {
				this.turnLeft();
			}
			if (command === Command.R) {
				this.turnRight();
			}
			if (command === Command.F) {
				this.moveForward();
			}
		});
	}

	private moveForward() {
		if (this.direction === Direction.N) {
			this.moveNorth();
		}
		if (this.direction === Direction.E) {
			this.moveEst();
		}
		if (this.direction === Direction.S) {
			this.moveSouth();
		}
		if (this.direction === Direction.W) {
			this.moveWest();
		}
	}
	private moveNorth() {
		const [x, y] = this.position;
		this.position = [x, y === this.planet.lastRow() ? 0 : y + 1];
	}
	private moveSouth() {
		const [x, y] = this.position;
		this.position = [x, y === 0 ? this.planet.lastRow() : y - 1];
	}
	private moveEst() {
		const [x, y] = this.position;
		this.position = [x === this.planet.lastRow() ? 0 : x + 1, y];
	}
	private moveWest() {
		const [x, y] = this.position;
		this.position = [x === 0 ? this.planet.lastRow() : x - 1, y];
	}

	private turnLeft() {
		const index = directions.indexOf(this.direction);
		this.direction = directions[(index - 1 + directions.length) % directions.length];
	}
	private turnRight() {
		const index = directions.indexOf(this.direction);
		this.direction = directions[(index + 1) % directions.length];
	}
}
