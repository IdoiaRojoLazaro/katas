import { Cell } from '../core/cell-ido';
import { CellStatus } from '../types';

const { Dead, Alive } = CellStatus;
describe('In the game of life', () => {
	it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', () => {
		expect(Cell.create(Alive).regenerate(1).status).toBe(Dead);
		expect(Cell.create(Dead).regenerate(1).status).toBe(Dead);
	});
	it('Any live cell with two or three live neighbors lives on the next generation', () => {
		expect(Cell.create(Alive).regenerate(2).status).toBe(Alive);
		expect(Cell.create(Alive).regenerate(3).status).toBe(Alive);
		expect(Cell.create(Dead).regenerate(2).status).toBe(Dead);
	});
	it('Any live cell with more than three live neighbors dies, as if by overcrowding', () => {
		expect(Cell.create(Alive).regenerate(4).status).toBe(Dead);
		expect(Cell.create(Alive).regenerate(5).status).toBe(Dead);
		expect(Cell.create(Dead).regenerate(4).status).toBe(Dead);
	});
	it('Any dead cell with exactly three live neighbors becomes a live cell', () => {
		expect(Cell.create(Dead).regenerate(3).status).toBe(Alive);
	});
});
