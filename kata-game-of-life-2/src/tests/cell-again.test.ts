/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any dead cell with exactly three live neighbors becomes a live cell.
 */
enum CellStatus {
	ALIVE = 0,
	DEAD = 1,
}
class Cell {
	private status: CellStatus;

	constructor(initialStatus: CellStatus) {
		this.status = initialStatus;
	}
	statusForAliveCell(neighbors): CellStatus {
		if (neighbors === 0 || neighbors === 1 || neighbors > 3) {
			return CellStatus.DEAD;
		} else {
			return CellStatus.ALIVE;
		}
	}
	statusForDeadCell(neighbors): CellStatus {
		if (this.status == CellStatus.DEAD && neighbors === 3) {
			return CellStatus.ALIVE;
		} else {
			return CellStatus.DEAD;
		}
	}

	regenerate(neighbors): CellStatus {
		return this.status == CellStatus.ALIVE ? this.statusForAliveCell(neighbors) : this.statusForDeadCell(neighbors);
	}
}

describe('Name of the group', () => {
	it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', () => {
		expect(new Cell(CellStatus.ALIVE).regenerate(1)).toBe(CellStatus.DEAD);
		expect(new Cell(CellStatus.ALIVE).regenerate(0)).toBe(CellStatus.DEAD);
	});
	it('Any live cell with two or three live neighbors lives on to the next generation.', () => {
		expect(new Cell(CellStatus.ALIVE).regenerate(2)).toBe(CellStatus.ALIVE);
		expect(new Cell(CellStatus.ALIVE).regenerate(3)).toBe(CellStatus.ALIVE);
	});
	it('Any live cell with more than three live neighbors dies, as if by overcrowding.', () => {
		expect(new Cell(CellStatus.ALIVE).regenerate(4)).toBe(CellStatus.DEAD);
	});
	it('Any dead cell with exactly three live neighbors becomes a live cell.', () => {
		expect(new Cell(CellStatus.DEAD).regenerate(3)).toBe(CellStatus.ALIVE);
	});
});
