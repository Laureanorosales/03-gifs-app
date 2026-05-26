import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PreviousSearches } from './PreviousSearches';

describe('PreviousSearches', () => {
	const mockSearches = ['goku', 'vegeta', 'dragon ball'];

	test('should render search list correctly', () => {
		render(<PreviousSearches searches={mockSearches} onLabelClicked={() => {}} />);

		expect(screen.getByText('Busquedas previas')).toBeDefined();
		mockSearches.forEach((term) => {
			expect(screen.getByText(term)).toBeDefined();
		});
	});

	test('should call onLabelClicked when an item is clicked', () => {
		const onLabelClickedMock = vi.fn();
		render(<PreviousSearches searches={mockSearches} onLabelClicked={onLabelClickedMock} />);

		const item = screen.getByText('vegeta');
		fireEvent.click(item);

		expect(onLabelClickedMock).toHaveBeenCalledTimes(1);
		expect(onLabelClickedMock).toHaveBeenCalledWith('vegeta');
	});
});
