import { Bowling } from '../core/bowlingGame';
describe('Kata bowling', () => {
	const bowling = new Bowling();
	describe('Basic scoring', () => {
		it('should return 0 for a game of all misses', () => {
			const game = generateRollsWithSamePins();
			expect(bowling.score(game)).toBe(0);
		});

		it('should return 20 for a game of all ones', () => {
			const game = generateRollsWithSamePins(1);
			expect(bowling.score(game)).toBe(20);
		});
	});

	describe('Spare scoring', () => {
		it('should correctly score a single spare followed by misses', () => {
			const game = [5, 5, 5, ...generateRollsWithSamePins(0, 17)];
			expect(bowling.score(game)).toBe(20);
		});
	});

	describe('Strike scoring', () => {
		it('should correctly score a single strike followed by open frames', () => {
			const game = [10, 2, 3, ...generateRollsWithSamePins(0, 16)];
			expect(bowling.score(game)).toBe(20);
		});
	});

	describe('Perfect game', () => {
		it('should return 300 for a perfect game', () => {
			const regularRolls = generateRollsWithSamePins(10, 10);
			const extraRolls = [10, 10];
			const game = [...regularRolls, ...extraRolls];

			expect(bowling.score(game)).toBe(300);
		});
	});

	describe('Games with spares', () => {
		it('should return 150 for a game of all fives (spares) with an extra roll of 5', () => {
			const regularRolls = generateRollsWithSamePins(5, 20);
			const extraRolls = [5];
			const game = [...regularRolls, ...extraRolls];

			expect(bowling.score(game)).toBe(150);
		});

		it('should return 180 for a game of alternating spares and extra roll of 8', () => {
			const regularRolls = Array.from({ length: 20 }, (_, i) => (i % 2 === 0 ? 8 : 2));
			const extraRolls = [8];
			const game = [...regularRolls, ...extraRolls];

			expect(bowling.score(game)).toBe(180);
		});
	});
});

function generateRollsWithSamePins(pins: number = 0, length: number = 20) {
	return Array(length).fill(pins);
}
