import { MarkDown } from '../core/MarkDown';

describe('MarkDown', () => {
	it('should transform a text', () => {
		const text = 'This is a text.';
		const markDown = MarkDown.create(text);
		expect(markDown.transform()).toBe('This is a text.');
	});
	it('should transform a text with one link', () => {
		const text = '[google](https://google.com) and some other text.';
		const markDown = MarkDown.create(text);
		expect(markDown.transform()).toBe('google [^anchor1] and some other text.\n[^anchor1]: https://google.com');
	});

	it('should avoid duplicated links', () => {
		const text = '[google](https://google.com) and the same [google](https://google.com).';
		const markDown = MarkDown.create(text);
		expect(markDown.transform()).toBe(
			'google [^anchor1] and the same google [^anchor1].\n[^anchor1]: https://google.com'
		);
	});

	it('should transform multiple links', () => {
		const text = '[google](https://google.com) and [firefox](https://firefox.com).';
		const markDown = MarkDown.create(text);
		expect(markDown.transform()).toBe(
			'google [^anchor1] and firefox [^anchor2].\n[^anchor1]: https://google.com\n[^anchor2]: https://firefox.com'
		);
	});
});
