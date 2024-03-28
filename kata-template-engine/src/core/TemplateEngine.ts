import { TemplateEngineErrorCodes, TemplateEngineProps, TemplateEngineResult, Variables } from '../types';
import { TemplateEngineError } from './TemplateEngineError';

export class TemplateEngine {
	result: string;
	errors: TemplateEngineError[] | null;
	constructor() {
		this.result = '';
		this.errors = null;
	}

	parse(template: TemplateEngineProps['template'], variables: TemplateEngineProps['variables']): TemplateEngineResult {
		const templateVariables = this.extractVariables(template);
		let result: string = template;
		if (this.templateTextHasVariables(templateVariables) && this.variablesAreNotValid(variables)) {
			this.addError(TemplateEngineErrorCodes.MISSING_PARAMETER);
		} else {
			result = this.replaceVariablesInTemplate(template, variables);
			this.addErrorsForTemplateVariablesNotReplaced(variables, templateVariables);
			this.addErrorsForNotFoundedVariables(variables, templateVariables);
		}

		return {
			result,
			errors: this.errors,
		};
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
