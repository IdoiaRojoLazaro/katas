import { CellMatrix, CellStatus, CellStatusMatrix } from '../types';
import { Cell } from './Cell';

export class GameOfLife {
	constructor(readonly cellMatrix: CellMatrix) {}

	static create(cellStatusMatrix: CellStatusMatrix): GameOfLife {
		const cellMatrix: CellMatrix = cellStatusMatrix.map((row) =>
			row.map((cellStatus: CellStatus) => Cell.create(cellStatus))
		);

		return new GameOfLife(cellMatrix);
	}

	public aliveNeighbors(x: number, y: number): number {
		return this.calculateAliveNeighbors(x, y);
	}

	nextGeneration() {
		const newCellMatrix: CellMatrix = this.cellMatrix.map((row, indexRow) =>
			row.map((cell: Cell, indexColumn) => cell.regenerate(this.aliveNeighbors(indexRow, indexColumn)))
		);

		return new GameOfLife(newCellMatrix);
	}

	private isValidCoordinate(x: number, y: number): boolean {
		const rowCount = this.cellMatrix.length;
		const colCount = this.cellMatrix[0]?.length || 0;

		return x >= 0 && y >= 0 && x < rowCount && y < colCount;
	}

	private isCellAlive(x: number, y: number): boolean {
		return this.isValidCoordinate(x, y) && this.cellMatrix[x][y].isAlive();
	}

	private calculateAliveNeighbors(x: number, y: number): number {
		let aliveNeighbors = 0;
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (this.isCentralCell(dx, dy)) continue;
				if (this.isCellAlive(x + dx, y + dy)) {
					aliveNeighbors++;
				}
			}
		}
		return aliveNeighbors;
	}

	private isCentralCell(dx: number, dy: number): boolean {
		return dx === 0 && dy === 0;
	}
}
