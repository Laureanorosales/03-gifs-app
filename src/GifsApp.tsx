import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { useGifs } from './gifs/hooks/useGifs';
import CustomHeader from './shared/components/CustomHeader';
import SearchBar from './shared/components/SearchBar';

// Componente principal
// Orquesta la búsqueda, el historial y la lista de GIFs
export const GifsApp = () => {
    const { handleSearch, handleTermClicked, previousTerms, gifs } = useGifs();

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
