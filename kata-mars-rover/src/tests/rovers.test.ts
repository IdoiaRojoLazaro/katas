type Position = [number, number];
enum Command {
	L = 'L',
	R = 'R',
	F = 'F',
}
enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}
const directions: Direction[] = Object.values(Direction);

class Matrix {
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

class Rover {
	constructor(
		private position: Position,
		private direction: Direction,
		private planet: Matrix
	) {}

	static create(position: Position, direction: Direction, planet: Matrix) {
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

describe('Mars rover', () => {
	it('Should turn left', () => {
		const rover = createRover([0, 0], Direction.N);
		rover.move([Command.L]);
		expect(rover.getPosition()).toBe('0:0:W');
	});

	it('Should turn right', () => {
		const rover = createRover([0, 0], Direction.N);
		rover.move([Command.R]);
		expect(rover.getPosition()).toBe('0:0:E');
	});

	it('Should move forward', () => {
		const rover = createRover([0, 0], Direction.N);
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:1:N');
	});

	it('Should follow multiple commands', () => {
		const rover = createRover([0, 0], Direction.N);
		rover.move([Command.R, Command.F, Command.F]);
		expect(rover.getPosition()).toBe('2:0:E');
	});

	it('Should get around the planet if is the last row', () => {
		const rover = createRover([10, 10], Direction.E);
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:10:E');
	});
	it('Should get around the planet if is the first row', () => {
		const rover = createRover([0, 0], Direction.W);
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('10:0:W');
	});
	it('Should get around the planet if is the last column', () => {
		const rover = createRover([10, 10], Direction.N);
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('10:0:N');
	});
	it('Should get around the planet if is the first column', () => {
		const rover = createRover([0, 0], Direction.S);
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:10:S');
	});
});

describe('Edge cases', () => {
	it('Should throw an error if initialize a rover outside of the planet', () => {
		const rover = createRover([0, 0], Direction.N);
		rover.move([Command.L]);
		expect(() => createRover([11, 11], Direction.N, 1, 1)).toThrow('Rover is outside of the planet');
	});
});

function createRover(position: Position, direction: Direction, planetRows: number = 10, planetColumns: number = 10) {
	const planet = new Matrix(planetRows, planetColumns);
	return Rover.create(position, direction, planet);
}
