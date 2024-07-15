import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '../SearchInput';



describe('SearchInput', () => {
    const mockCallback = jest.fn();

    beforeEach(() => {
        render(<SearchInput onSearchTrigger={mockCallback}  />);

        const searchInput = screen.getByRole('textbox', { name: /searchInput/i });
        fireEvent.change(searchInput, { target: { value: 'anakin' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);
    });

    test('Fires callback with given search term', () => {
        expect(mockCallback).toBeCalledWith("anakin");
    });

    test('Saves Search Term to Local Storage', () => {
        expect(window.localStorage.getItem("searchTerm")).toEqual("anakin");
    });
});
