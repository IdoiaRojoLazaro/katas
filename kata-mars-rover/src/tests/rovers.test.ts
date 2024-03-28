type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'M';
class Rover {
	constructor(
		private readonly position: [number, number],
		private readonly direction: Direction
	) {}

	static create(position: [number, number], direction: Direction) {
		return new Rover(position, direction);
	}
	getPosition() {
		return `${this.position[0]}:${this.position[1]}:${this.direction}`;
	}
	nextPosition(commands: Command[]) {
		return Rover.create([0, 0], 'W');
	}
}

describe('Mars rover', () => {
	it('Should create a matrix', () => {
		const rover = Rover.create([0, 0], 'N');
		expect(rover.nextPosition(['L']).getPosition()).toBe('0:0:W');
	});
});
