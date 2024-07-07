import { Component } from 'react';
import {StyledSearchResult} from "./styled";
import {SearchResultObject} from "../Wrapper";


interface Props {
    results: SearchResultObject[];
    loading: boolean;
    error: string;
}

export class SearchResult extends Component<Props> {
    render() {
        const { results, loading, error } = this.props;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <StyledSearchResult>
               {results.length ? <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result.name}</li>
                    ))}
                </ul> : <span>Nothing found...</span> }
            </StyledSearchResult>
        );
    }
}
