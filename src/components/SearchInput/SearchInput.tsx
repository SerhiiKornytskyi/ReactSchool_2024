import { ChangeEvent, useState, useEffect } from "react";
import { StyledSearchInput } from "./styled";

interface Props {
  onSearchTrigger: (searchTerm: string, pageNumber?: number) => Promise<void>;
}

export const SearchInput = ({ onSearchTrigger }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    savedSearchTerm && setSearchTerm(savedSearchTerm);
  }, []);

  const handleSearch = () => {
    localStorage.setItem("searchTerm", searchTerm);
    onSearchTrigger(searchTerm);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <StyledSearchInput>
      <h1>Star Wars Character Search</h1>
      <input
        aria-label="searchInput"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter character name"
      />
      <br />
      <button name={"searchButton"} onClick={handleSearch}>
        Search
      </button>
    </StyledSearchInput>
  );
};
