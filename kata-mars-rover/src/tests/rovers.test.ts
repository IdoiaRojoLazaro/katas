import { MartianGrid } from '../core/MartianGrid';
import { Navigator } from '../core/Navigator';
import { Rover } from '../core/Rover';
import { Direction, Command, Coordinates } from '../types';

describe('Mars rover', () => {
	it.each([
		[Direction.N, '0:0:N'],
		[Direction.E, '0:0:E'],
		[Direction.S, '0:0:S'],
		[Direction.W, '0:0:W'],
	])('Should create a rover facing %s', (direction, expectedLocation) => {
		const rover = createRover({ direction });
		expect(rover.getLocation()).toBe(expectedLocation);
	});

	it.each([
		[[Command.L], '0:0:W'],
		[[Command.R], '0:0:E'],
		[[Command.F], '0:1:N'],
		[[Command.F, Command.F], '0:2:N'],
		[[Command.R, Command.F, Command.F], '2:0:E'],
		[[Command.L, Command.F, Command.F], '8:0:W'],
		[[Command.L, Command.L, Command.F, Command.F], '0:8:S'],
		[[Command.F, Command.R, Command.F, Command.F, Command.R], '2:1:S'],
	])('Should execute commands %s', (commands, expectedLocation) => {
		const rover = createRover();
		rover.executeCommands(commands);
		expect(rover.getLocation()).toBe(expectedLocation);
	});

	it('Should execute multiple %s', () => {
		const rover = createRover();
		rover.executeCommands([Command.L, Command.F, Command.F]);
		expect(rover.getLocation()).toBe('8:0:W');
	});

	it('Should get around the planet if is the last row', () => {
		const rover = createRover({ position: [9, 9], direction: Direction.E });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('0:9:E');
	});
	it('Should get around the planet if is the first row', () => {
		const rover = createRover({ direction: Direction.W });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('9:0:W');
	});
	it('Should get around the planet if is the last column', () => {
		const rover = createRover({ position: [9, 9] });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('9:0:N');
	});
	it('Should get around the planet if is the first column', () => {
		const rover = createRover({ direction: Direction.S });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('0:9:S');
	});
});

describe('Edge cases', () => {
	it('Should throw an error if navigator is null', () => {
		expect(() => Rover.create(null as Navigator)).toThrow('Navigator is required');
		expect(() => Rover.create(undefined as Navigator)).toThrow('Navigator is required');
		expect(() => Rover.create('invalidNavigator' as unknown as Navigator)).toThrow(
			'Navigator must be of type Navigator'
		);
	});

	it('Should throw an error for a not valid command', () => {
		const planet = MartianGrid.create(10, 10);
		const navigator = Navigator.create([0, 0], Direction.N, planet);
		const rover = Rover.create(navigator);
		expect(() => rover.executeCommands(['X' as Command])).toThrow('Command is not valid');
		expect(() => rover.executeCommands([null as Command])).toThrow('Command is not valid');
	});
});

function createRover({
	position = [0, 0],
	direction = Direction.N,
	planetRows = 10,
	planetColumns = 10,
}: { position?: Coordinates; direction?: Direction; planetRows?: number; planetColumns?: number } = {}) {
	const planet = MartianGrid.create(planetRows, planetColumns);
	const navigator = Navigator.create(position, direction, planet);
	return Rover.create(navigator);
}
