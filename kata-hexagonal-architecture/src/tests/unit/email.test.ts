import { Email } from '../../core/common/Email';

describe('The Server', () => {
	it('Should return an error if email is empty, null or undefined', () => {
		expect(() => Email.create('')).toThrow('Email is required');
		expect(() => Email.create(null as string)).toThrow('Email is required');
		expect(() => Email.create(undefined as string)).toThrow('Email is required');
	});
	it('Should return an error for a given address in an incorrect format', () => {
		expect(() => Email.create('emailyopmail.com')).toThrow('Invalid format for email address');
	});
	it('checks that two emails with same address are equal', () => {
		const email1 = Email.create('email@yopmail.com');
		const email2 = Email.create('email@yopmail.com');
		expect(email1.isEqual(email2)).toBe(true);
	});
	it('checks that two emails with different address are different', () => {
		const email1 = Email.create('email@yopmail.com');
		const email2 = Email.create('differentEmail@yopmail.com');
		expect(email1.isEqual(email2)).toBe(false);
	});
});
