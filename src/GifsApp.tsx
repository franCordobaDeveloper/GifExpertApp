import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";

import { CustomHeader } from "./shared/componentes/CustomHeader";
import { SearchBar } from "./shared/componentes/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);



    const handleTermClicked = (term: string) => {
        console.log({ term });
    }

    const handleSearch = async (query: string = '') => {
        const queryValid = query.toLowerCase().trim();

        if (queryValid.length === 0) return;

        if (previousTerms.includes(queryValid)) return;

        setPreviousTerms(prev => {
            return [queryValid, ...prev].splice(0, 8);
        });

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);
    }

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