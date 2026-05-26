import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGifs } from './useGifs';
import { act } from 'react';
import * as gifActions from '../actions/get-gifs-by-query.action';

describe('useGifs', () => {
	test('should return default values and methods', () => {
		const { result } = renderHook(() => useGifs());

		expect(result.current.gifs.length).toBe(0);

		expect(result.current.previousTerms.length).toBe(0);

		expect(result.current.handleSearch).toBeDefined();

		expect(result.current.handleTermClicked).toBeDefined();
	});

	test('should return a list of gifs', async () => {
		const { result } = renderHook(() => useGifs());

		await act(async () => {
			await result.current.handleSearch('Goku');
		});

		expect(result.current.gifs.length).toBe(10);
	});

	test('should return a list of gifs when handleTermClicked is call', async () => {
		const { result } = renderHook(() => useGifs());

		await act(async () => {
			await result.current.handleTermClicked('Goku');
		});

		expect(result.current.gifs.length).toBe(10);
	});

	test('should return a list of gifs from cache', async () => {
		const { result } = renderHook(() => useGifs());

		await act(async () => {
			await result.current.handleTermClicked('Goku');
		});

		expect(result.current.gifs.length).toBe(10);

		vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is error'));

		await act(async () => {
			await result.current.handleTermClicked('Goku');
		});

		expect(result.current.gifs.length).toBe(10);
	});

	test('should return no mor than 8 previous terms', async () => {
		const { result } = renderHook(() => useGifs());

		vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

		await act(async () => {
			await result.current.handleSearch('Goku1');
		});
		await act(async () => {
			await result.current.handleSearch('Goku2');
		});
		await act(async () => {
			await result.current.handleSearch('Goku3');
		});
		await act(async () => {
			await result.current.handleSearch('Goku4');
		});
		await act(async () => {
			await result.current.handleSearch('Goku5');
		});
		await act(async () => {
			await result.current.handleSearch('Goku6');
		});
		await act(async () => {
			await result.current.handleSearch('Goku7');
		});
		await act(async () => {
			await result.current.handleSearch('Goku8');
		});
		await act(async () => {
			await result.current.handleSearch('Goku9');
		});

		expect(result.current.previousTerms.length).toBe(8);
		expect(result.current.previousTerms).toStrictEqual([
			'goku9',
			'goku8',
			'goku7',
			'goku6',
			'goku5',
			'goku4',
			'goku3',
			'goku2',
		]);
		console.log(result.current.previousTerms);
	});
});
