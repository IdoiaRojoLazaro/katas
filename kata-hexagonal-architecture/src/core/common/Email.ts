import { ValidationError } from './ValidationError';

export class Email {
	private constructor(private readonly address: string) {}
	static create(address: string) {
		if (this.isValidEmail(address)) return new Email(address);
	}
	isEqual(email: Email) {
		return email.address === this.address;
	}
	private static isValidEmail(address: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (address === '' || !address) {
			throw new ValidationError('Email is required');
		}
		if (!address.match(emailRegex)) {
			throw new ValidationError('Invalid format for email address');
		}
		return true;
	}
}
