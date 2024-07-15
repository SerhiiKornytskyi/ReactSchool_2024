import {StyledResultWrapper, StyledSearchResults, StyledSearchResultCardContainer, StyledResultDetail} from "./styled";
import {SearchResult} from "../Wrapper/Wrapper";
import {SearchResultCard} from "../SearchResultCard";
import {Outlet} from "react-router-dom";

interface Props {
    results: SearchResult[];
    loading: boolean;
    error: string;
}

export const SearchResults = ({results, loading, error }: Props) => {

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <StyledSearchResults>
               {results.length ? <StyledResultWrapper>
                    {results.map((result, index) => (
                        <StyledSearchResultCardContainer>
                            <SearchResultCard key={index} result={result} />
                        </StyledSearchResultCardContainer>
                    ))}
                </StyledResultWrapper> : <span>Nothing found...</span> }
                <StyledResultDetail>
                    <Outlet />
                </StyledResultDetail>
            </StyledSearchResults>
        );

}
