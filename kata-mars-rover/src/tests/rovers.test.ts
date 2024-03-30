import { MartianGrid } from '../core/MartianGrid';
import { Navigator } from '../core/Navigator';
import { Rover } from '../core/Rover';
import { Direction, Command, Coordinates } from '../types';

describe('Mars rover', () => {
	it('Should turn left', () => {
		const rover = createRover();
		rover.executeCommands([Command.L]);
		expect(rover.getLocation()).toBe('0:0:W');
	});

	it('Should turn right', () => {
		const rover = createRover();
		rover.executeCommands([Command.R]);
		expect(rover.getLocation()).toBe('0:0:E');
	});

	it('Should move forward', () => {
		const rover = createRover();
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('0:1:N');
	});

	it('Should follow multiple commands', () => {
		const rover = createRover();
		rover.executeCommands([Command.R, Command.F, Command.F]);
		expect(rover.getLocation()).toBe('2:0:E');
	});

	it('Should get around the planet if is the last row', () => {
		const rover = createRover({ position: [10, 10], direction: Direction.E });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('0:10:E');
	});
	it('Should get around the planet if is the first row', () => {
		const rover = createRover({ direction: Direction.W });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('10:0:W');
	});
	it('Should get around the planet if is the last column', () => {
		const rover = createRover({ position: [10, 10] });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('10:0:N');
	});
	it('Should get around the planet if is the first column', () => {
		const rover = createRover({ direction: Direction.S });
		rover.executeCommands([Command.F]);
		expect(rover.getLocation()).toBe('0:10:S');
	});
});

describe('Edge cases', () => {
	it('Should throw an error if navigator is null', () => {
		const navigator = null as Navigator;
		expect(() => Rover.create(navigator)).toThrow('Navigator is required');
	});
	it('Should throw an error if navigator is undefined', () => {
		const navigator = undefined as Navigator;
		expect(() => Rover.create(navigator)).toThrow('Navigator is required');
	});

	it('Should throw an error if navigator is not valid', () => {
		const invalidNavigator = 'invalidNavigator' as unknown as Navigator;
		expect(() => Rover.create(invalidNavigator)).toThrow('Navigator must be of type Navigator');
	});

	it('Should throw an error for a not valid command', () => {
		const planet = MartianGrid.create(10, 10);
		const navigator = Navigator.create([0, 0], Direction.N, planet);
		const rover = Rover.create(navigator);
		expect(() => rover.executeCommands(['X' as Command])).toThrow('Command is not valid');
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
