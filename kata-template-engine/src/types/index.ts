import { TemplateEngineError } from '../core/TemplateEngineError';

export enum TemplateEngineErrorCodes {
	VARIABLE_NOT_FOUND = 'VARIABLE_NOT_FOUND',
	VARIABLE_NOT_REPLACED = 'VARIABLE_NOT_REPLACED',
	MISSING_PARAMETER_VARIABLES = 'MISSING_PARAMETER',
	MISSING_PARAMETER_TEMPLATE_TEXT = 'MISSING_PARAMETER_TEMPLATE_TEXT',
}
export interface Variables {
	[key: string]: string;
}
export interface TemplateEngineResultProps {
	parsedText: string;
	errors: TemplateEngineError[] | null;
}
export interface TemplateEngineProps {
	template: string;
	variables: Variables;
}
