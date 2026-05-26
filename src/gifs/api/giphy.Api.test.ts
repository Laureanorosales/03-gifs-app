import { describe, expect, test } from 'vitest';
import { giphyApi } from './giphy.Api';

describe('giphi.Api', () => {
	test('Should be configured correctly', () => {
		const params = giphyApi.defaults.params;

		// toBe para primitivos
		expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
		expect(params.lang).toBe('es');
		expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
		// toEqual para objetos
		expect(params).toEqual({
			lang: 'es',
			api_key: import.meta.env.VITE_GIPHY_API_KEY,
		});
	});
});
