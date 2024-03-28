import { TemplateEngineError } from '../core/TemplateEngineError';

export interface TemplateEngineResult {
	result: string;
	errors: TemplateEngineError[] | null;
}
export enum TemplateEngineErrorCodes {
	VARIABLE_NOT_FOUND = 'VARIABLE_NOT_FOUND',
	VARIABLE_NOT_REPLACED = 'VARIABLE_NOT_REPLACED',
	MISSING_PARAMETER = 'MISSING_PARAMETER',
}
export interface Variables {
	[key: string]: string;
}
export interface TemplateEngineProps {
	template: string;
	variables: Variables;
}
