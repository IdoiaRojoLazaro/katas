import { TemplateEngine } from '../core/TemplateEngine';
import { TemplateEngineErrorCodes, Variables } from '../types';

describe('Template engine error cases', () => {
	it('should throw error if parameter variables is null or undefined', () => {
		const { output, result, errors } = testTemplateEngine({
			input: 'This is a template with one ${variable}!',
			variables: null,
		});

		expect(result).toBe(output);
		expect(errors.length).toBe(1);
		expect(errors[0].errorCode).toBe(TemplateEngineErrorCodes.MISSING_PARAMETER);
		expect(errors[0].message).toBe('Missing parameter variables');
	});

	it('should return an error for every variable not found in template', () => {
		const { output, result, errors } = testTemplateEngine({
			input: 'This is a template with one ${variable}!',
			variables: {
				variable: null,
			},
		});

		expect(result).toBe(output);
		expect(errors.length).toBe(1);
		expect(errors[0].errorCode).toBe(TemplateEngineErrorCodes.VARIABLE_NOT_REPLACED);
		expect(errors[0].message).toBe('Variable variable could not be replaced');
	});
	it('should throw error for every variable in the template could not be replaced', () => {
		const { output, result, errors } = testTemplateEngine({
			input: 'This is a template with one ${variable} and one ${foo}!',
			variables: {
				foo: 'foo',
			},
		});

		expect(result).toBe(output);
		expect(errors.length).toBe(1);
		expect(errors[0].errorCode).toBe(TemplateEngineErrorCodes.VARIABLE_NOT_REPLACED);
		expect(errors[0].message).toBe('Variable variable could not be replaced');
	});

	it('should throw error for every variable in the template that has no match in the variables object', () => {
		const { output, result, errors } = testTemplateEngine({
			input:
				'This is a text with a ${variable} to be replaced. And this is another text with ${other-variable} to be replaced! \n And this is the last text with ${last-variable} to be replaced.',
			variables: {
				variable: null,
				'other-variable': null,
				'last-variable': null,
			},
		});

		expect(result).toBe(output);
		expect(errors.length).toBe(3);
		expect(errors[0].errorCode).toBe(TemplateEngineErrorCodes.VARIABLE_NOT_REPLACED);
		expect(errors[0].message).toBe('Variable variable could not be replaced');
		expect(errors[1].message).toBe('Variable other-variable could not be replaced');
		expect(errors[2].message).toBe('Variable last-variable could not be replaced');
	});
});

describe('Template engine', () => {
	it('should parse a template without variables', () => {
		const { output, result, errors } = testTemplateEngine({
			input: 'This is a template without variables!',
			variables: null,
		});
		expect(result).toBe(output);
		expect(errors).toBeNull();
	});
	it('should parse a template with a variable.', () => {
		const { output, result, errors } = testTemplateEngine({
			input: 'This is a template with one ${variable}!',
			variables: {
				variable: 'foo',
			},
		});
		expect(result).toBe(output);
		expect(errors).toBeNull();
	});
	it('should parse a template with multiple variables', () => {
		const { output, result, errors } = testTemplateEngine({
			input:
				'This is a text with a ${variable} to be replaced. And this is another text with ${other-variable} to be replaced! \n And this is the last text with ${last-variable} to be replaced.',
			variables: {
				variable: 'foo',
				'other-variable': 'bar',
				'last-variable': 'baz',
			},
		});
		expect(result).toBe(output);
		expect(errors).toBeNull();
	});
	it('should parse a template with repeated variables', () => {
		const { output, result, errors } = testTemplateEngine({
			input:
				'This is a text with a ${variable} to be replaced. And this is another text with ${variable} to be replaced! \n And this is the last text with ${variable} to be replaced.',
			variables: {
				variable: 'foo',
			},
		});
		expect(result).toBe(output);
		expect(errors).toBeNull();
	});
});

function testTemplateEngine({
	input,
	variables,
	output = null,
}: {
	input: string;
	variables: Variables;
	output?: string;
}) {
	const templateEngine = new TemplateEngine();
	const { result, errors } = templateEngine.parse(input, variables);
	if (!output) {
		output = replaceVariablesInString(input, variables);
	}
	return { output, result, errors };
}

function replaceVariablesInString(input: string, variables: Variables) {
	if (!variables) return input;
	return input.replace(/\${(.*?)}/g, (match, variable) => {
		const trimmedVariable = variable.trim();
		if (variables.hasOwnProperty(trimmedVariable)) {
			return variables[trimmedVariable];
		} else {
			return match;
		}
	});
}
