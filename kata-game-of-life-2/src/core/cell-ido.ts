import { CellStatus } from '../types';

export class Cell {
	constructor(readonly status: CellStatus) {}
	static create(status: CellStatus): Cell {
		return new Cell(status);
	}
	isAlive(): boolean {
		return this.status === CellStatus.Alive;
	}
	private statusForDeadCell(numberOfNeighbors: number) {
		const isFertilePopulation = numberOfNeighbors === 3;
		return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
	}
	private statusForAliveCell(numberOfNeighbors: number) {
		const isStablePopulation = numberOfNeighbors === 2 || numberOfNeighbors === 3;
		return isStablePopulation ? CellStatus.Alive : CellStatus.Dead;
	}

	regenerate(numberOfNeighbors: number) {
		const nextStatus =
			this.status === CellStatus.Alive
				? this.statusForAliveCell(numberOfNeighbors)
				: this.statusForDeadCell(numberOfNeighbors);
		return new Cell(nextStatus);
	}
}
