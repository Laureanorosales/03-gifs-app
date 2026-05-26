import { useEffect, useState } from 'react';

interface Props {
	placeholder?: string;
	onQuery: (query: string) => void;
}

// Componente SearchBar
// Barra de búsqueda con debounce automático de 700ms y disparo manual con Enter o botón
const SearchBar = ({ placeholder = 'Buscar', onQuery }: Props) => {
	const [query, setQuery] = useState('');

	// Debounce: espera 700ms desde que el usuario deja de escribir para disparar la búsqueda
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onQuery(query);
		}, 700);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [query, onQuery]);

	// Función de búsqueda manual
	// Ejecuta la búsqueda inmediatamente y limpia el input
	const handleSearch = () => {
		onQuery(query);
		setQuery('');
	};

	// Detecta cuando se presiona Enter para disparar la búsqueda
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className='search-container'>
			<input
				type='text'
				placeholder={placeholder}
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				onKeyDown={handleKeyDown}></input>
			<button onClick={handleSearch}>Buscar</button>
		</div>
	);
};

export default SearchBar;
