import { Cell } from '../core/cell-ido';

export type CellMatrix = Cell[][];
export type CellStatusMatrix = CellStatus[][];

export enum CellStatus {
	Dead,
	Alive,
}
