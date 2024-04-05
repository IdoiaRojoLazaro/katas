import { ValidationError } from './ValidationError';

export enum PasswordErrors {
	PasswordTooShort = 'must be at least 6 characters long',
	PasswordNoUppercase = 'must have at least one uppercase letter',
	PasswordNoLowercase = 'must have at least one lowercase letter',
	PasswordNoNumber = 'must have at least one number',
	PasswordNoUnderscore = 'must have at least one underscore',
}
export class Password {
	private constructor(readonly value: string) {}
	static create(password: string) {
		this.isValidPassword(password);
		return new Password(password);
	}
	private static isValidPassword(password: string) {
		let accumulatedErrors = [];
		if (!this.isValidPasswordLength(password)) {
			accumulatedErrors.push(PasswordErrors.PasswordTooShort);
		}
		if (!this.hasOneUppercase(password)) {
			accumulatedErrors.push(PasswordErrors.PasswordNoUppercase);
		}
		if (!this.hasOneLowercase(password)) {
			accumulatedErrors.push(PasswordErrors.PasswordNoLowercase);
		}
		if (!this.hasOneNumber(password)) {
			accumulatedErrors.push(PasswordErrors.PasswordNoNumber);
		}
		if (!this.hasOneUnderscore(password)) {
			accumulatedErrors.push(PasswordErrors.PasswordNoUnderscore);
		}
		if (accumulatedErrors.length > 0) {
			throw new ValidationError(`Password ${accumulatedErrors.join(', ')}`);
		}
		return true;
	}
	private static isValidPasswordLength(password: string) {
		return password.length > 5;
	}
	private static hasOneUppercase(password: string) {
		const uppercaseRegex = /[A-Z]/;
		return password.match(uppercaseRegex);
	}
	private static hasOneLowercase(password: string) {
		const lowercaseRegex = /[a-z]/;
		return password.match(lowercaseRegex);
	}
	private static hasOneNumber(password: string) {
		const numberRegex = /[0-9]/;
		return password.match(numberRegex);
	}
	private static hasOneUnderscore(password: string) {
		const underscoreRegex = /[_]/;
		return password.match(underscoreRegex);
	}
	// isEquals(password: Password) {
	// 	return password.value === this.value;
	// }
}
