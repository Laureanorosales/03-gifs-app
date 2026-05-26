import { beforeEach, describe, expect, test, vi } from 'vitest';
import axiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from './get-gifs-by-query.action';
import { giphyApi } from '../api/giphy.Api';
import { giphyResponseMock } from '../../../test/mock/giphy.response.data';

describe('getGifsByQuery', () => {
	let mock = new axiosMockAdapter(giphyApi);

	beforeEach(() => {
		// mock.reset();
		mock = new axiosMockAdapter(giphyApi);
	});

	// test('should return a list of gifs', async () => {
	// 	const gifs = await getGifsByQuery('goku');
	// 	const [gif1] = gifs;
	// 	// console.log(gifs);

	// 	expect(gifs.length).toBe(10);
	// 	// console.log(gif1);
	// 	expect(gif1).toStrictEqual({
	// 		id: expect.any(String),
	// 		title: expect.any(String),
	// 		url: expect.any(String),
	// 		width: expect.any(Number),
	// 		height: expect.any(Number),
	// 	});
	// });

	test('should return a list of gifs', async () => {
		mock.onGet('/search').reply(200, giphyResponseMock);

		const gifs = await getGifsByQuery('goku');

		// console.log(gifs);
		expect(gifs.length).toBe(10);

		gifs.forEach((gif) => {
			expect(typeof gif.id).toBe('string');
			expect(typeof gif.title).toBe('string');
			expect(typeof gif.url).toBe('string');
			expect(typeof gif.width).toBe('number');
			expect(typeof gif.height).toBe('number');
		});
	});

	test('should return an empty list of gifs if query is empty', async () => {
		// mock.onGet('/search').reply(200, giphyResponseMock);
		mock.restore();
		const gifs = await getGifsByQuery('');

		// console.log(gifs);
		expect(gifs.length).toBe(0);
	});

	test('should handle error when the API returns an error', async () => {
		// Poner un espia JAJA
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		mock.onGet('/search').reply(400, {
			data: {
				message: 'Bad request',
			},
		});

		const gifs = await getGifsByQuery('Goku');

		// console.log(gifs);

		expect(gifs.length).toBe(0);
		expect(consoleErrorSpy).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
	});
});
