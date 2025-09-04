import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";


describe('SearchBar', () => {

    test('should render searchbar correcly', () => {

        const { container } = render(<SearchBar onQuery={() => { }} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('textbox')).toBeDefined();
    })

    test('should call onQuey with the correct value after 700ms', async () => {

        const onQuery = vi.fn();

        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });

        // screen.debug(); 
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        })

    })

    test('should call only once with last value (debounce)', async () => {

        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {

            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');

        })
    })

    test('should call onQuey when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    })

    test('should the input has the correct placeholder value', () => {
        const onQuery = vi.fn();
        const value = "Buscar gif"
        render(<SearchBar onQuery={onQuery} placeholder={value} />);

        // screen.debug();

        expect(screen.getByPlaceholderText(value)).toBeDefined();
    })

})  