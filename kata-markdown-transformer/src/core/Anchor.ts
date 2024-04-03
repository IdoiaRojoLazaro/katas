export class Anchor {
	private constructor(
		readonly text: string,
		readonly url: string
	) {}

	static create(text: string, url: string) {
		return new Anchor(text, url);
	}

	format(index: number) {
		return `[^anchor${index}]: ${this.url}`;
	}
}
