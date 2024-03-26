import { CellMatrix, CellStatus, CellStatusMatrix } from '../types';
import { Cell } from './cell-ido';

export class GameOfLife {
	cellMatrix: CellMatrix;
	constructor(cellMatrix: CellMatrix) {
		this.cellMatrix = cellMatrix;
	}
	static create(cellStatusMatrix: CellStatusMatrix) {
		const cellMatrix: CellMatrix = cellStatusMatrix.map((row) =>
			row.map((cellStatus: CellStatus) => Cell.create(cellStatus))
		);

		return new GameOfLife(cellMatrix);
	}
	countAliveNeighbors(x: number, y: number) {
		let aliveNeighbors = 0;
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;
				aliveNeighbors += this.isCellAlive(x + dx, y + dy) ? 1 : 0;
			}
		}
		return aliveNeighbors;
	}

	isCellAlive(x: number, y: number) {
		const finalIndexRow = this.cellMatrix.length - 1;
		const finalIndexCols = this.cellMatrix[0].length - 1;

		if (x < 0 || y < 0 || x > finalIndexRow || y > finalIndexCols) return false;
		return this.cellMatrix[x][y].isAlive();
	}

	nextGeneration() {
		const newCellMatrix: CellMatrix = this.cellMatrix.map((row, indexRow) =>
			row.map((cell: Cell, indexColumn) => cell.regenerate(this.countAliveNeighbors(indexRow, indexColumn)))
		);

		return new GameOfLife(newCellMatrix);
	}
}
