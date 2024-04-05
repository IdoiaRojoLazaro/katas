import { Password, PasswordErrors } from '../../core/common/Password';

describe('Password', () => {
	it('should create a password when', () => {
		const password = Password.create('Password1_');
		expect(password).toBeInstanceOf(Password);
	});
	it('should throw and error if less than 6 chars', () => {
		expect(() => Password.create('1aA_')).toThrow(`Password ${PasswordErrors.PasswordTooShort}`);
	});
	it('should throw and error if no uppercase found', () => {
		expect(() => Password.create('1a_56*')).toThrow(`Password ${PasswordErrors.PasswordNoUppercase}`);
	});
	it('should throw and error if no lower found', () => {
		expect(() => Password.create('1A_56*')).toThrow(`Password ${PasswordErrors.PasswordNoLowercase}`);
	});
	it('should throw and error if no number found', () => {
		expect(() => Password.create('aA_aa*')).toThrow(`Password ${PasswordErrors.PasswordNoNumber}`);
	});
	it('should throw and error if no number found', () => {
		expect(() => Password.create('aA1aa*')).toThrow(`Password ${PasswordErrors.PasswordNoUnderscore}`);
	});
	it('should throw multiple errors ', () => {
		const accumulatedErrors = [
			PasswordErrors.PasswordTooShort,
			PasswordErrors.PasswordNoUppercase,
			PasswordErrors.PasswordNoLowercase,
			PasswordErrors.PasswordNoNumber,
			PasswordErrors.PasswordNoUnderscore,
		];
		expect(() => Password.create('*')).toThrow(`Password ${accumulatedErrors.join(', ')}`);
	});
});
