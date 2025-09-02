import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";

import { CustomHeader } from "./shared/componentes/CustomHeader";
import { SearchBar } from "./shared/componentes/SearchBar";



export const GifsApp = () => {
    const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

    return (
        <div className="app-container">
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Buscar Gifs" onQuery={handleSearch} />

            {/* Previous Searches */}
            <PreviousSearches onLabelClicked={handleTermClicked} searches={previousTerms} />

            {/* Gifs */}
            <GifList gifs={gifs} />
        </div>
    )
}