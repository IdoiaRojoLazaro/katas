import { Cell } from '../core/Cell';
import { GameOfLife } from '../core/GameOfLife';
import { CellStatus } from '../types';

const { Dead, Alive } = CellStatus;

describe('Testing game of life', () => {
	it('creates a cell matrix for a given cell status', () => {
		const matrix = [
			[Dead, Alive],
			[Alive, Dead],
		];
		const gameOfLife = GameOfLife.create(matrix);
		const expectedMatrix = createMatrix(matrix);
		expect(gameOfLife.cellMatrix).toEqual(expectedMatrix);
	});
	it('gets alive neighbors for a given coordinates', () => {
		const matrix = [
			[Alive, Dead, Dead, Alive],
			[Dead, Alive, Alive, Dead],
			[Alive, Dead, Dead, Alive],
		];
		const gameOfLife = GameOfLife.create(matrix);
		expect(gameOfLife.aliveNeighbors(0, 0)).toEqual(1);
		expect(gameOfLife.aliveNeighbors(0, 3)).toEqual(1);
		expect(gameOfLife.aliveNeighbors(2, 3)).toEqual(1);
		expect(GameOfLife.create([[Dead]]).aliveNeighbors(0, 0)).toBe(0);
		expect(GameOfLife.create([[Dead, Alive]]).aliveNeighbors(0, 0)).toBe(1);
		expect(GameOfLife.create([[Alive, Dead]]).aliveNeighbors(0, 1)).toBe(1);
		expect(GameOfLife.create([[Alive, Dead, Alive]]).aliveNeighbors(0, 1)).toBe(2);
		expect(
			GameOfLife.create([
				[Alive, Dead, Alive],
				[Alive, Alive, Alive],
			]).aliveNeighbors(0, 1)
		).toBe(5);
		expect(
			GameOfLife.create([
				[Alive, Dead, Alive],
				[Dead, Dead, Dead],
			]).aliveNeighbors(0, 1)
		).toBe(2);
		expect(
			GameOfLife.create([
				[Alive, Alive, Alive],
				[Alive, Dead, Alive],
				[Alive, Alive, Alive],
			]).aliveNeighbors(1, 1)
		).toBe(8);
	});

	it('generates the next state of the world', () => {
		const initialStatus = [
			[Dead, Alive, Dead],
			[Dead, Alive, Dead],
			[Dead, Alive, Dead],
		];
		const gameOfLifeNextGen = GameOfLife.create(initialStatus).nextGeneration();
		const nextGeneration = [
			[Dead, Dead, Dead],
			[Alive, Alive, Alive],
			[Dead, Dead, Dead],
		];
		const expectedMatrix = createMatrix(nextGeneration);
		expect(gameOfLifeNextGen.cellMatrix).toEqual(expectedMatrix);
	});
	it('never changes for a given initial block pattern', () => {
		const initialWorld = GameOfLife.create([
			[Alive, Alive, Dead, Dead, Dead],
			[Alive, Alive, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);

		const currentWorld = initialWorld.nextGeneration().nextGeneration();

		expect(currentWorld).toEqual(initialWorld);
	});

	it('Reestablishes the same state after two generations when a given oscillator pattern is provided', () => {
		const world = GameOfLife.create([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);

		const result = world.nextGeneration().nextGeneration();

		expect(result).toEqual(world);
	});

	function createMatrix(matrix: CellStatus[][]) {
		return matrix.map((row) => row.map((cellStatus: CellStatus) => Cell.create(cellStatus)));
	}
});
