import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { GifsApp } from './GifsApp';
describe('Probando gifsApp', () => {
	test('Should render component properly', () => {
		const { container } = render(<GifsApp />);

		expect(container).toMatchSnapshot();
	});
});
