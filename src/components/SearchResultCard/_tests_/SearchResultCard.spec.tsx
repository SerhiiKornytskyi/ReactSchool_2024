// src/__tests__/SearchResultCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchResultCard } from '../SearchResultCard';

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

describe('SearchResultCard', () => {
    test('loads and displays card', () => {
        render(<SearchResultCard result={mockResult}/>);

        const nameNode = screen.getByText('Luke Skywalker');
        const homeWorldNode = screen.getByText('Homeworld: https://swapi.dev/api/planets/1/');
        const heightNode = screen.getByText('Height: 172');
        const genderNode = screen.getByText('Gender: male');

        expect(nameNode).toBeInTheDocument();
        expect(homeWorldNode).toBeInTheDocument();
        expect(heightNode).toBeInTheDocument();
        expect(genderNode).toBeInTheDocument();
    });
});
