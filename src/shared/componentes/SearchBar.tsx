import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
    placeholder?: string;

    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = 'Buscar', onQuery }: Props) => {

    const [query, setQuery] = useState('');

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            onQuery(query);
            setQuery('');
        }, 2000)

        return () => {
            clearTimeout(timeoutId);
        };

    }, [query, onQuery]);


    const handleSearch = () => {
        onQuery(query);
        setQuery('');
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="search-input"

                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch} className="search-button">Buscar</button>
            </div>
        </div>
    )
}
