import { Component, ChangeEvent } from 'react';
import {StyledSearchInput} from "./styled";

interface Props {
  onTrigger: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

export class SearchInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onTrigger(searchTerm);
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
        <StyledSearchInput>
          <h1>Star Wars Character Search</h1>
          <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
              placeholder="Enter character name"
          />
          <button onClick={this.handleSearch}>Search</button>
        </StyledSearchInput>
    );
  }
}

