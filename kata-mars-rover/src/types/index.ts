export type Position = [number, number];
export enum Command {
	L = 'L',
	R = 'R',
	F = 'F',
}
export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}
export const directions: Direction[] = Object.values(Direction);
