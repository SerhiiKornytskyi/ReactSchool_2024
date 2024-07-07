import { Component } from 'react';
import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";
import { StyledWrapper } from "./styled";

interface Props {}

export interface SearchResultObject {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

interface State {
    searchTerm: string;
    searchResults: SearchResultObject[];
    loading: boolean;
    error: string;
}

export class Wrapper extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: "",
            searchResults: [],
            error: "",
            loading: false,
        };
    }

    handleThrowError = () => {
        // Throw an error to test the Error Boundary
        throw new Error('This is a test error');
    };

    handleSearch = async (searchTerm: string) => {
        this.setState({ searchTerm, loading: true, error: "" });
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            this.setState({ searchResults: data.results, loading: false });

        } catch (error) {
            this.setState({ error: (error as Error).message, loading: false });
        }
    }

    render() {
        const { searchResults, loading, error } = this.state;

        return (
            <StyledWrapper>
                <SearchInput onTrigger={this.handleSearch} />
                <button onClick={this.handleThrowError}>Throw Error</button>
                <SearchResult results={searchResults} loading={loading} error={error} />
            </StyledWrapper>
        );
    }
}
