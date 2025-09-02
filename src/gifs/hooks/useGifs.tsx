import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    };

    const handleSearch = async (query: string = '') => {
        const queryValid = query.toLowerCase().trim();

        if (queryValid.length === 0) return;

        if (previousTerms.includes(queryValid)) return;

        setPreviousTerms(prev => {
            return [queryValid, ...prev].splice(0, 8);
        });

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);

        gifsCache.current[query] = gifs;
    }

    return {
        // properties
        gifs,
        previousTerms,

        // actions / methods
        handleTermClicked,
        handleSearch
    }
}
