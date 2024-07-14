import {StyledResultWrapper, StyledSearchResults, StyledSearchResultCardContainer} from "./styled";
import {SearchResultCard} from "../SearchResultCard";
import {} from "Wrapper";
import {SearchResult} from "../Wrapper/Wrapper";

interface Props {
    result: SearchResult,
    closeCallback: () => {}
}

export const w = ({result, closeCallback}: Props) => {

    return (
        <div>
            result
            <span onClick={closeCallback}>
                X
            </span>
        </div>
    );

}
