import { useState, useEffect, MouseEvent, useContext } from "react";
import { SearchInput } from "../SearchInput/index";
import { SearchResults } from "../SearchResults/index";
import { StyledWrapper, StyledPaginatorItem, StyledPaginator } from "./styled";
import { useNavigate } from "react-router-dom";
import { WrapperState } from "../../utils/types";
import { useSearchPeopleQuery } from "../../api/peopleSlice/peopleSlice";
import { DarkModeContext } from "../../context";
import {Flyout} from "../Flyout/Flyout";

export const Wrapper = () => {
  const [state, setState] = useState<WrapperState>({
    searchTerm: "",
    searchResults: [],
    isLoading: false,
    error: undefined,
    nextPage: null,
    prevPage: null,
  });

  const darkModeContext = useContext(DarkModeContext);
  const { theme, isDark, toggleTheme } = darkModeContext;
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const { data, error, isLoading } = useSearchPeopleQuery({
    searchQuery: state.searchTerm,
    page: pageCount,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    data &&
    setState({
      ...state,
      searchResults: data.results ? data.results : [],
      searchTerm,
      isLoading,
      error,
      nextPage: data.next || null,
      prevPage: data.previous || null,
    });
  }, [data, isLoading, error]);

  const handleThrowError = () => {
    throw new Error("This is a test error");
  };

  const handleSearch = async (searchTerm: string, pageNumber = 1) => {
    setState({ ...state, searchTerm, isLoading: true });
    setPageCount(pageNumber);
    const urlSearchParams = `?search=${searchTerm}&page=${pageNumber}`;
    navigate(urlSearchParams);
  };

  const goToNextPage = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (state.nextPage) {
      handleSearch(state.searchTerm, pageCount + 1);
    }
  };

  const goToPrevPage = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (state.prevPage) {
      handleSearch(state.searchTerm, pageCount - 1);
    }
  };

  return (
      <StyledWrapper style={{backgroundColor: theme.backgroundColor, color: theme.color}} >
        <div>
          <label>{isDark ? "Dark theme" : "Regular theme"}</label>
          <input onChange={toggleTheme} type="checkbox" checked={isDark} />
        </div>
        <div>
          <SearchInput onSearchTrigger={handleSearch} />
        </div>
        <br />
        <div>
          <button onClick={handleThrowError}>Throw Error</button>
        </div>
        <br />
        {state.searchResults.length ? (
            <StyledPaginator>
              <StyledPaginatorItem
                  onClick={goToPrevPage}
                  to={""}
                  visible={!!state.prevPage}
                  className={"paginator-prev"}
              >
                {"PrevPage"}
              </StyledPaginatorItem>
              <span>Page: {pageCount}</span>
              <StyledPaginatorItem
                  to={""}
                  visible={!!state.nextPage}
                  onClick={goToNextPage}
                  className={"paginator-next"}
              >
                {"NextPage"}
              </StyledPaginatorItem>
            </StyledPaginator>
        ) : undefined}
        <br />
        <SearchResults
            results={state.searchResults}
            loading={state.isLoading}
            error={!!state.error}
        />
        <Flyout />
      </StyledWrapper>
  );
};
