import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';
import { giphyApi } from '../api/giphy.Api';

// Función que busca GIFs por un término en la API de Giphy
// Retorna un arreglo de Gif con los campos que necesita la app
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
	if (query.trim().length === 0) {
		return [];
	}
	try {
		const response = await giphyApi<GiphyResponse>('/search', {
			params: {
				q: query,
				limit: 10,
				rating: 'r',
			},
		});

		return response.data.data.map((gif) => ({
			id: gif.id,
			title: gif.title,
			url: gif.images.original.url,
			width: Number(gif.images.original.width),
			height: Number(gif.images.original.height),
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
};
