import { MartianGrid } from '../core/MartianGrid';
import { Coordinates, Direction } from '../types';
import { Navigator } from '../core/Navigator';

describe('Navigator tests', () => {
	it('Should create the navigator and return current coordinates', () => {
		const navigator = createNavigator();
		expect(navigator.currentCoordinates()).toEqual([0, 0]);
	});
	it('Should move forward when direction north', () => {
		const navigator = createNavigator({ position: [5, 5], direction: Direction.N });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([5, 6]);
	});
	it('Should move forward when direction est', () => {
		const navigator = createNavigator({ position: [5, 5], direction: Direction.E });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([6, 5]);
	});
	it('Should move forward when direction south', () => {
		const navigator = createNavigator({ position: [5, 5], direction: Direction.S });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([5, 4]);
	});
	it('Should move forward when direction west', () => {
		const navigator = createNavigator({ position: [5, 5], direction: Direction.W });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([4, 5]);
	});
});

describe('Navigator tests edge of the planet', () => {
	it('Should wrap around the grid when reaching the edge with north direction', () => {
		const navigator = createNavigator({ position: [10, 10] });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([10, 0]);
	});
	it('Should wrap around the grid when reaching the edge with south direction', () => {
		const navigator = createNavigator({ direction: Direction.S });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([0, 10]);
	});
	it('Should wrap around the grid when reaching the edge with est direction', () => {
		const navigator = createNavigator({ position: [10, 10], direction: Direction.E });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([0, 10]);
	});
	it('Should wrap around the grid when reaching the edge with west direction', () => {
		const navigator = createNavigator({ direction: Direction.W });
		navigator.moveForward();
		expect(navigator.currentCoordinates()).toEqual([10, 0]);
	});
});

describe('Navigator tests edge cases', () => {
	it('Should throw an error if planet is null', () => {
		const planet = null as MartianGrid;
		expect(() => {
			Navigator.create([0, 0], Direction.N as Direction, planet);
		}).toThrow('Planet is required');
	});
	it('Should throw an error if planet is undefined', () => {
		const planet = undefined as MartianGrid;
		expect(() => {
			Navigator.create([0, 0], Direction.N as Direction, planet);
		}).toThrow('Planet is required');
	});

	it('Should throw an error if planet is not valid', () => {
		const invalidPlanet = 'invalidPlanet' as unknown as MartianGrid;
		expect(() => {
			Navigator.create([0, 0], Direction.N as Direction, invalidPlanet);
		}).toThrow('Planet must be of type MartianGrid');
	});

	it('Should returns an error if direction is invalid', () => {
		const planet = MartianGrid.create(10, 10);
		expect(() => {
			Navigator.create([0, 0], 'invalidDirection' as Direction, planet);
		}).toThrow('Invalid direction');
	});
	it('Should returns an error if longitude is negative', () => {
		const planet = MartianGrid.create(10, 10);
		expect(() => {
			Navigator.create([-10, 10], Direction.N, planet);
		}).toThrow('Coordinates are outside of the grid');
	});
	it('Should returns an error if latitude is negative', () => {
		const planet = MartianGrid.create(10, 10);
		expect(() => {
			Navigator.create([-10, 10], Direction.N, planet);
		}).toThrow('Coordinates are outside of the grid');
	});
	it('Should returns an error if longitude is bigger than planet size', () => {
		const planet = MartianGrid.create(10, 10);
		expect(() => {
			Navigator.create([20, 10], Direction.N, planet);
		}).toThrow('Coordinates are outside of the grid');
	});
	it('Should returns an error if latitude is bigger than planet size', () => {
		const planet = MartianGrid.create(10, 10);
		expect(() => {
			Navigator.create([10, 20], Direction.N, planet);
		}).toThrow('Coordinates are outside of the grid');
	});
});

export function createNavigator({
	position = [0, 0],
	direction = Direction.N,
	planetRows = 10,
	planetColumns = 10,
}: { position?: Coordinates; direction?: Direction; planetRows?: number; planetColumns?: number } = {}) {
	const planet = MartianGrid.create(planetRows, planetColumns);
	return Navigator.create(position, direction, planet);
}
