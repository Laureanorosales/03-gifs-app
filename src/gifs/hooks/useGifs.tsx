import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
	// Estado que guarda los GIFs obtenidos de la API para mostrar en pantalla
	const [gifs, setGifs] = useState<Gif[]>([]);

	// Estado que guarda los términos buscados anteriormente
	const [previousTerms, setPreviousTerms] = useState<string[]>([]);

	const gifsCache = useRef<Record<string, Gif[]>>({});

	// Función que se ejecuta al hacer clic en un término del historial
	const handleTermClicked = async (term: string) => {
		if (gifsCache.current[term]) {
			setGifs(gifsCache.current[term]);
			return;
		}
		const gifs = await getGifsByQuery(term);
		setGifs(gifs);
		gifsCache.current[term] = gifs;
	};

	// Función principal de búsqueda
	// Valida el query, evita duplicados, actualiza el historial y llama a la API
	const handleSearch = async (query: string = '') => {
		// trim = Sin espacios ; toLowerCase = todo minuscula
		query = query.trim().toLowerCase();
		// term === '' espacio vacio, return(termina la funcion)
		if (query.length === 0) return;
		// previousTerms incluye el term, termina la funcion
		if (previousTerms.includes(query)) return;
		// actualiza el array con un spread ..., retorna el actualizado con un limite de 8
		setPreviousTerms((prev) => {
			const updated = [query, ...prev];
			return updated.slice(0, 8);
		});
		const gifs = await getGifsByQuery(query);
		setGifs(gifs);
		gifsCache.current[query] = gifs;
		// console.log(gifsCache);
	};

	return {
		gifs,

		handleSearch,
		handleTermClicked,
		previousTerms,
	};
};
