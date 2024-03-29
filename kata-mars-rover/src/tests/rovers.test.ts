import { Grid } from '../core/Grid';
import { Rover } from '../core/Rover';
import { Direction, Command, Position } from '../types';

describe('Mars rover', () => {
	it('Should turn left', () => {
		const rover = createRover();
		rover.move([Command.L]);
		expect(rover.getPosition()).toBe('0:0:W');
	});

	it('Should turn right', () => {
		const rover = createRover();
		rover.move([Command.R]);
		expect(rover.getPosition()).toBe('0:0:E');
	});

	it('Should move forward', () => {
		const rover = createRover();
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:1:N');
	});

	it('Should follow multiple commands', () => {
		const rover = createRover();
		rover.move([Command.R, Command.F, Command.F]);
		expect(rover.getPosition()).toBe('2:0:E');
	});

	it('Should get around the planet if is the last row', () => {
		const rover = createRover({ position: [10, 10], direction: Direction.E });
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:10:E');
	});
	it('Should get around the planet if is the first row', () => {
		const rover = createRover({ direction: Direction.W });
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('10:0:W');
	});
	it('Should get around the planet if is the last column', () => {
		const rover = createRover({ position: [10, 10] });
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('10:0:N');
	});
	it('Should get around the planet if is the first column', () => {
		const rover = createRover({ direction: Direction.S });
		rover.move([Command.F]);
		expect(rover.getPosition()).toBe('0:10:S');
	});
});

describe('Edge cases', () => {
	it('Should throw an error if initialize a rover outside of the planet', () => {
		const rover = createRover();
		rover.move([Command.L]);
		expect(() => createRover({ position: [11, 11], planetRows: 1, planetColumns: 1 })).toThrow(
			'Rover is outside of the planet'
		);
	});
});

function createRover({
	position = [0, 0],
	direction = Direction.N,
	planetRows = 10,
	planetColumns = 10,
}: { position?: Position; direction?: Direction; planetRows?: number; planetColumns?: number } = {}) {
	const planet = new Grid(planetRows, planetColumns);
	return Rover.create(position, direction, planet);
}
