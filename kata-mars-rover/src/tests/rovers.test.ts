import { Matrix } from '../core/Matrix';
import { Rover } from '../core/Rover';
import { Direction, Command, Position } from '../types';

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
