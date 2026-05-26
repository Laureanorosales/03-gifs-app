import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GifList } from './GifList';
import type { Gif } from '../interfaces/gif.interface';

describe('GifList', () => {
	const mockGifs: Gif[] = [
		{
			id: '123',
			title: 'Goku GIF',
			url: 'https://media.giphy.com/goku.gif',
			width: 300,
			height: 300,
		},
		{
			id: '456',
			title: 'Vegeta GIF',
			url: 'https://media.giphy.com/vegeta.gif',
			width: 400,
			height: 400,
		},
	];

	test('should render list of gifs correctly', () => {
		render(<GifList gifs={mockGifs} />);

		// Check images
		const images = screen.getAllByRole('img');
		expect(images.length).toBe(mockGifs.length);
		expect(images[0].getAttribute('src')).toBe(mockGifs[0].url);
		expect(images[0].getAttribute('alt')).toBe(mockGifs[0].title);

		// Check titles
		expect(screen.getByText('Goku GIF')).toBeDefined();
		expect(screen.getByText('Vegeta GIF')).toBeDefined();

		// Check sizes
		expect(screen.getByText('300x300 (1.5mb)')).toBeDefined();
		expect(screen.getByText('400x400 (1.5mb)')).toBeDefined();
	});

	test('should render empty container if no gifs are provided', () => {
		const { container } = render(<GifList gifs={[]} />);
		const gridDiv = container.querySelector('.gifs-container');
		expect(gridDiv).toBeDefined();
		expect(gridDiv?.children.length).toBe(0);
	});
});
