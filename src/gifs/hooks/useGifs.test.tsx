import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";



describe('useGifs', () => {

    test('should return default values and methods', () => {

        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);

        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        // handleSearch
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('messi');
        })

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('messi');
        })

        expect(result.current.gifs.length).toBe(10);

    })

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('messi');
        })

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'))

        await act(async () => {
            await result.current.handleTermClicked('messi');
        })

        expect(result.current.gifs.length).toBe(10);
    })

    test('should return no more than 8 previous terms', async () => {

        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([])

        await act(async () => {
            await result.current.handleSearch('messi1');
        })
        await act(async () => {
            await result.current.handleSearch('messi2');
        })
        await act(async () => {
            await result.current.handleSearch('messi3');
        })
        await act(async () => {
            await result.current.handleSearch('messi4');
        })
        await act(async () => {
            await result.current.handleSearch('messi5');
        })
        await act(async () => {
            await result.current.handleSearch('messi6');
        })
        await act(async () => {
            await result.current.handleSearch('messi7');
        })

        await act(async () => {
            await result.current.handleSearch('messi8');
        })
        await act(async () => {
            await result.current.handleSearch('messi9');
        })

        console.log(result.current.previousTerms);

        expect(result.current.previousTerms.length).toBe(8);

        expect(result.current.previousTerms).toStrictEqual([
            'messi9', 'messi8',
            'messi7', 'messi6',
            'messi5', 'messi4',
            'messi3', 'messi2'
        ])

    })
})