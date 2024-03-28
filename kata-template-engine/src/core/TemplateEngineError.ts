import { TemplateEngineErrorCodes } from '../types/index';

export class TemplateEngineError {
	constructor(
		readonly errorCode: TemplateEngineErrorCodes,
		readonly message: string
	) {}

	static create(errorCode: TemplateEngineErrorCodes, variable?: string): TemplateEngineError {
		const message = this.setMessageError(errorCode, variable);
		console.log(message);
		return new TemplateEngineError(errorCode, message);
	}

	private static setMessageError(errorCode: TemplateEngineErrorCodes, variable?: string): string {
		let message = '';
		switch (errorCode) {
			case TemplateEngineErrorCodes.MISSING_PARAMETER:
				message = 'Missing parameter variables';
				break;

			case TemplateEngineErrorCodes.VARIABLE_NOT_FOUND:
				message = `Variable ${variable} not found in template`;
				break;

			case TemplateEngineErrorCodes.VARIABLE_NOT_REPLACED:
				message = `Variable ${variable} could not be replaced`;
				break;

			default:
				throw new Error('Unhandled error code');
		}
		return message;
	}
}
