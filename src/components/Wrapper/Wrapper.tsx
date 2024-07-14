import { useState, useEffect, MouseEvent } from 'react';
import { SearchInput } from "../SearchInput/index";
import { SearchResults } from "../SearchResults/index";
import { StyledWrapper, StyledPaginatorItem, StyledPaginator } from "./styled";
import { useNavigate } from "react-router-dom";


export interface SearchResult {
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
    searchResults: SearchResult[];
    loading: boolean;
    error: string;
    nextPage: string | null;
    prevPage: string | null;
}

export const Wrapper = () => {
    const [state, setState] = useState<State>({
        searchTerm: '',
        searchResults: [],
        loading: false,
        error: '',
        nextPage: null,
        prevPage: null,
    })
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageNumber = parseInt(queryParams.get('page') || '1', 10);
        const searchTerm = queryParams.get('search') || '';
        // perform seacrh using query params from url
        if (searchTerm) {
            handleSearch(searchTerm, pageNumber);
        }
    }, []);

    const handleThrowError = () => {
        // Throw an error to test the Error Boundary
        throw new Error('This is a test error');
    };

    const handleSearch = async (searchTerm: string, pageNumber?: number) => {
        setState({ ...state, searchTerm, loading: true, error: ""});
        const searchQuery = !!pageNumber ? `${searchTerm}&page=${pageNumber}` : searchTerm;
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setState({ ...state, searchTerm, searchResults: data.results, loading: false, nextPage: data.next, prevPage: data.previous });
            setPageCount(pageNumber || 1);
            // update current URL with search params
            if (searchTerm) {
                const urlSeacrhParams = pageNumber ? `?search=${searchTerm}&page=${pageNumber}` : `?search=${searchTerm}`
                navigate(urlSeacrhParams);
            }
        } catch (error) {
            setState({ ...state, error: (error as Error).message, loading: false, nextPage: null, prevPage: null });
        }
    }

    const goToNextPage = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (state.nextPage) {
            handleSearch(state.searchTerm, pageCount + 1);
        }
    };

    const goToPrevPage = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (state.prevPage) {
            handleSearch(state.searchTerm, pageCount - 1)
        }
    };

    return (
        <StyledWrapper>
            <div>
                <SearchInput onSearchTrigger={handleSearch} />
            </div>
            <br/>
            <div>
                <button onClick={handleThrowError}>Throw Error</button>
            </div>
            <br/>
            {state.searchResults.length ? <StyledPaginator>
                <StyledPaginatorItem
                    onClick={goToPrevPage}
                    to={""}
                    visible={!!state.prevPage}
                    className={"paginator-prev"}>{"<< Prev"}</StyledPaginatorItem>
                <span>Page: {pageCount}</span>
                <StyledPaginatorItem
                    to={""}
                    visible={!!state.nextPage}
                    onClick={goToNextPage}
                    className={"paginator-next"}>{"Next >>"}</StyledPaginatorItem>
            </StyledPaginator> : undefined}
            <br/>
            <SearchResults
                results={state.searchResults}
                loading={state.loading}
                error={state.error} />
        </StyledWrapper>
    );
}
