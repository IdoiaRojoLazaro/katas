import { Command, validCommands } from '../types';
import { Navigator } from './Navigator';

export class Rover {
	private constructor(private navigator: Navigator) {}

	static create(navigator: Navigator) {
		if (!navigator || navigator === undefined) throw new Error('Navigator is required');
		if (!(navigator instanceof Navigator)) throw new Error('Navigator must be of type Navigator');
		return new Rover(navigator);
	}

	getLocation() {
		const [x, y] = this.navigator.currentCoordinates();
		return `${x}:${y}:${this.navigator.currentDirection()}`;
	}

	executeCommands(commands: Command[]) {
		for (const command of commands) {
			this.executeCommand(command);
		}
	}

	private executeCommand(command: Command): void {
		if (!validCommands.includes(command)) {
			throw new Error('Command is not valid');
		}
		switch (command) {
			case Command.L:
				this.navigator.turnLeft();
				break;
			case Command.R:
				this.navigator.turnRight();
				break;
			case Command.F:
				this.navigator.moveForward();
				break;
		}
	}
}
