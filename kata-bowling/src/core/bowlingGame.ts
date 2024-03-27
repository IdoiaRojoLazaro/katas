import { Frame, Game } from '../types/types';

export class Bowling {
	MAX_FRAMES = 10;

	private isSpare(frame: Frame): boolean {
		return frame[0] + frame[1] === 10 && frame[0] !== 10;
	}
	private isStrike(pins: number): boolean {
		return pins === 10;
	}

	calculateStrikeScore(nextRoll: number, afterNextRoll: number): number {
		return 10 + nextRoll + afterNextRoll;
	}
	calculateSpareScore(nextRoll: number): number {
		return 10 + nextRoll;
	}

	score(game: Game): number {
		let totalScore = 0;
		let frameIndex = 0;
		for (let frame = 0; frame < this.MAX_FRAMES; frame++) {
			if (this.isStrike(game[frameIndex])) {
				totalScore += this.calculateStrikeScore(game[frameIndex + 1], game[frameIndex + 2]);
				frameIndex += 1;
			} else {
				if (this.isSpare([game[frameIndex], game[frameIndex + 1]])) {
					totalScore += this.calculateSpareScore(game[frameIndex + 2]);
				} else {
					totalScore += game[frameIndex] + game[frameIndex + 1];
				}
				frameIndex += 2;
			}
		}
		return totalScore;
	}
}
