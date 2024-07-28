import {
  StyledResultWrapper,
  StyledSearchResults,
  StyledSearchResultCardContainer,
} from "./styled";
import { SearchResult } from "../../utils/types";
import { DarkModeContext } from "../../context";
import { SearchResultCard } from "../SearchResultCard";
import {useContext} from "react";

interface Props {
  results: SearchResult[];
  loading: boolean;
  error: boolean;
}

export const SearchResults = ({ results = [], loading, error }: Props) => {

  const darkModeContext = useContext(DarkModeContext);
  const { theme } = darkModeContext;


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <StyledSearchResults style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
      {loading && <p>...Loading</p>}
      {results.length ? (
        <StyledResultWrapper>
          {results.map((result, index) => (
            <StyledSearchResultCardContainer key={index+result.name}>
              <SearchResultCard result={result}   />
            </StyledSearchResultCardContainer>
          ))}
        </StyledResultWrapper>
      ) : (
        <span>Nothing found...</span>
      )}
    </StyledSearchResults>
  );
};
