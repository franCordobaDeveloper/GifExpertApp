import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { CustomHeader } from "./CustomHeader";


describe('CustomHeader', () => {

    const title = "Test Title";

    test('should render the title correctly', () => {


        render(<CustomHeader title={title} />)
        screen.debug();
        expect(screen.getByText(title)).toBeDefined();

    });

    test('should render the description when provided', () => {

        const description = "Test Description";
        render(<CustomHeader title={title} description={description} />)
        //expect(screen.getByText(description));
        screen.debug();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);

    });


    test('should not render description when not provided', () => {

        const { container } = render(<CustomHeader title={title} />);

        const headerElement = container.querySelector('.app-header');

        const h1 = headerElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const p = headerElement?.querySelector('.header-subtitle');
        expect(p).toBeNull();

    });
})