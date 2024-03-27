import { Cell } from '../core/Cell';

export type CellMatrix = Cell[][];
export type CellStatusMatrix = CellStatus[][];

export enum CellStatus {
	Dead,
	Alive,
}
