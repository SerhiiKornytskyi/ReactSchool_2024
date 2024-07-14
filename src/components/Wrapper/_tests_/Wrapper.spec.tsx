import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Wrapper } from '../Wrapper';

// mock single result
const mockResult = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/"
    ],
    species: [],
    vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/"
};

// mock 10 results
const mockResults = new Array(10).fill(mockResult);

// mock the entire API result object


// mocking fetch and it's results
const mockFetchResults = jest.fn(() => Promise.resolve({
    ok: true,
    json:  () => Promise.resolve({
        results: mockResults
    })
}));

global.fetch = mockFetchResults as jest.Mock;

describe('Wrapper', () => {
    test('Fetches results and updates URL', async () => {

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const search = searchParams.get("search");
            const page = searchParams.get("page");
            return [search, page];
        }

        // Render Wrapper in scope of MemoryRouter
        render(
            <BrowserRouter>
                <Wrapper />
            </BrowserRouter>
        );

        const searchInput = screen.getByRole('textbox', { name: /searchInput/i });
        fireEvent.change(searchInput, { target: { value: 'anakin' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=anakin');
            const [search, page] = getPageParams();
            expect(search).toEqual('anakin');
            expect(page).toEqual(null);
        });

        const nextPaginator = screen.getByText('NextPage');
        fireEvent.click(nextPaginator);

        await waitFor(() => {
            const [search, page] = getPageParams();
            expect(search).toEqual('anakin');
            expect(page).toEqual(null);
        });
    });


    test('Checks Loading Indicator', async () => {
        render(
            <MemoryRouter>
                <Wrapper />
            </MemoryRouter>
        );
        const searchInput = screen.getByRole('textbox', { name: /searchInput/i });
        fireEvent.change(searchInput, { target: { value: 'an' } });

        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);

        const loadingIndicator = screen.getByText("Loading...");

        expect(loadingIndicator).toBeInTheDocument();
    })
});
