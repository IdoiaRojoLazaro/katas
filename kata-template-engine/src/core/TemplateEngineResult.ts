import { TemplateEngineResultProps } from '../types/index';

export class TemplateEngineResult {
	constructor(
		readonly parsedText: TemplateEngineResultProps['parsedText'],
		readonly errors: TemplateEngineResultProps['errors']
	) {}

	static create(
		parsedText: TemplateEngineResultProps['parsedText'],
		errors: TemplateEngineResultProps['errors']
	): TemplateEngineResult {
		return new TemplateEngineResult(parsedText, errors);
	}
}
