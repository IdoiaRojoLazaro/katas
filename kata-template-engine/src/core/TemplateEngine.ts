import { TemplateEngineErrorCodes, TemplateEngineProps, TemplateEngineResultProps, Variables } from '../types';
import { TemplateEngineError } from './TemplateEngineError';
import { TemplateEngineResult } from './TemplateEngineResult';

export class TemplateEngine {
	errors: TemplateEngineError[] | null;
	constructor(
		private readonly templateText: TemplateEngineProps['template'],
		private readonly variables: TemplateEngineProps['variables']
	) {
		this.errors = null;
	}

	parse(templateText: TemplateEngineProps['template'], variables: TemplateEngineProps['variables']) {
		const templateVariables = this.extractVariables(templateText);

		if (!templateText) {
			return this.templateWithMissingParams(templateText, TemplateEngineErrorCodes.MISSING_PARAMETER_TEMPLATE_TEXT);
		}

		if (this.templateTextHasVariables(templateVariables) && this.variablesAreNotValid(variables)) {
			return this.templateWithMissingParams(templateText, TemplateEngineErrorCodes.MISSING_PARAMETER_VARIABLES);
		}

		return this.templateParsed(templateText, templateVariables, variables);
	}

	static create(templateText, variables) {
		return new TemplateEngine(templateText, variables);
	}

	private templateParsed(templateText: TemplateEngineResultProps['parsedText'], templateVariables, variables) {
		const parsedText = this.replaceVariablesInTemplate(templateText, variables);

		this.addErrorsForTemplateVariablesNotReplaced(variables, templateVariables);
		this.addErrorsForNotFoundedVariables(variables, templateVariables);

		return TemplateEngineResult.create(parsedText, this.errors);
	}

	private templateWithMissingParams(templateText: TemplateEngineResult['parsedText'], error: TemplateEngineErrorCodes) {
		this.addError(error);
		return TemplateEngineResult.create(templateText, this.errors);
	}

	private extractVariables(template: string): string[] {
		const variablePattern = /\${(.*?)}/g;
		const variables = [];
		let match;

		while ((match = variablePattern.exec(template)) !== null) {
			variables.push(match[1].trim());
		}

		return variables;
	}

	private replaceVariablesInTemplate(template: string, variables: Variables): string {
		return template.replace(/\${(.*?)}/g, (match, variable) => {
			const trimmedVariable = variable.trim();
			if (variable && variables.hasOwnProperty(trimmedVariable)) {
				return variables[trimmedVariable];
			} else {
				return match; // If the variable is not found, return the variable as it is.
			}
		});
	}

	private addError(errorCode: TemplateEngineErrorCodes, variable?: string): void {
		const error: TemplateEngineError = TemplateEngineError.create(errorCode, variable);
		if (this.errors) {
			this.errors.push(error);
		} else {
			this.errors = [error];
		}
	}

	private addErrorsForNotFoundedVariables(variables: Variables, templateVariables: string[]): void {
		for (const variableKey in variables) {
			if (!templateVariables.includes(variableKey)) {
				this.addError(TemplateEngineErrorCodes.VARIABLE_NOT_FOUND, variableKey);
			}
		}
	}

	private addErrorsForTemplateVariablesNotReplaced(variables: Variables, templateVariables: string[]): void {
		templateVariables.forEach((variableKey) => {
			if (variables[variableKey] === null || variables[variableKey] === undefined) {
				this.addError(TemplateEngineErrorCodes.VARIABLE_NOT_REPLACED, variableKey);
			}
		});
	}

	private templateTextHasVariables(templateVariables: string[]): boolean {
		return templateVariables.length > 0;
	}

	private variablesAreNotValid(variables: Variables): boolean {
		return !variables || Object.keys(variables).length === 0;
	}
}
