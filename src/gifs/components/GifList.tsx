import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";


interface Props {
    gifs: Gif[];
}



export const GifList: FC<Props> = ({ gifs }) => {
    return (
        <div className="gifs-container">
            {
                gifs.map((gif) => (
                    <div key={gif.id} className="gif-card">
                        <div className="gif-image-container">
                            <img src={gif.url} alt={gif.title} className="gif-image" />
                            <div className="gif-overlay">
                                <button className="gif-action-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </button>
                                <button className="gif-action-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                        <polyline points="16 6 12 2 8 6"></polyline>
                                        <line x1="12" y1="2" x2="12" y2="15"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="gif-info">
                            <h3 className="gif-title">{gif.title}</h3>
                            <p className="gif-dimensions">{gif.width}x{gif.height} (1.6mb)</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
