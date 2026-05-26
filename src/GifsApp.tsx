import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import CustomHeader from './shared/components/CustomHeader';
import SearchBar from './shared/components/SearchBar';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';

// Componente principal
// Orquesta la búsqueda, el historial y la lista de GIFs
export const GifsApp = () => {
	// Estado que guarda los términos buscados anteriormente
	const [previousTerms, setPreviousTerms] = useState<string[]>([]);

	// Función que se ejecuta al hacer clic en un término del historial
	const handleTermClicked = (term: string) => {
		console.log({ term });
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
	};

	// Estado que guarda los GIFs obtenidos de la API para mostrar en pantalla
	const [gifs, setGifs] = useState<Gif[]>([]);

	return (
		<>
			{/* Header */}
			<CustomHeader title='Buscador de Gifs' description='Descubre y comparte el gif perfecto' />
			{/* Search */}
			<SearchBar placeholder='Busca lo que quieras' onQuery={handleSearch} />

			{/* Busquedas previas */}
			<PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />
			{/* Gifs */}
			<GifList gifs={gifs} />
		</>
	);
};
