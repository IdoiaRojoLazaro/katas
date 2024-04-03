import { Anchor } from './Anchor';

export class MarkDown {
	private constructor(private readonly text: string) {}
	private readonly linkRegex = /\[(.*?)\]\((.*?)\)/g;
	private readonly emptyLinkRegex = /\[(.*?)\]\(\s*\)/g;
	static create(text: string) {
		return new MarkDown(text);
	}

	transform(): string {
		this.validateLinks();

		const links = this.findLinks();
		if (!links) return this.text;

		const anchors: Anchor[] = this.transformLinksToAnchors(links);
		const parsedText = this.replaceLinksInText(anchors);
		const footnotes = this.generateFootnotes(anchors);

		return `${parsedText}${footnotes}`;
	}

	private validateLinks() {
		const emptyLinks = this.emptyLinks();
		if (emptyLinks.length > 0) {
			const linkNames = emptyLinks.map((match) => match[1]);
			throw new Error(`The following links are empty: ${linkNames.join(', ')}`);
		}
	}

	private findLinks(): RegExpMatchArray[] {
		return Array.from(this.text.matchAll(this.linkRegex));
	}

	private transformLinksToAnchors(links: RegExpMatchArray[]): Anchor[] {
		const anchors: Anchor[] = [];

		links.forEach((match) => {
			const [, linkText, linkUrl] = match;
			if (!linkUrl) {
				throw new Error(`The link for "${linkText}" is empty`);
			}

			if (!this.isAnchorDuplicated(anchors, linkUrl)) {
				this.addAnchor(anchors, linkUrl, linkText);
			}
		});
		return anchors;
	}

	private replaceLinksInText(anchors: Anchor[]): string {
		let transformedText = this.text;

		if (anchors) {
			anchors.forEach((anchor, index) => {
				const anchorTag = `${anchor.text} [^anchor${index + 1}]`;

				transformedText = transformedText.replace(
					new RegExp(`\\[${anchor.text}\\]\\(${anchor.url}\\)`, 'g'),
					anchorTag
				);
			});
		}

		return transformedText;
	}

	private emptyLinks(): RegExpMatchArray[] {
		return Array.from(this.text.matchAll(this.emptyLinkRegex));
	}

	private generateFootnotes(anchors: Anchor[]) {
		if (anchors.length === 0) {
			return '';
		}
		return `\n${anchors.map((anchor, index) => anchor.format(index + 1)).join('\n')}`;
	}

	private addAnchor(anchors: Anchor[], linkUrl: string, linkTitle: string) {
		anchors.push(Anchor.create(linkTitle, linkUrl));
	}

	private isAnchorDuplicated(anchors: Anchor[], linkUrl: string) {
		return anchors.find((anchor, index) => anchor.format(index).includes(linkUrl));
	}
}
