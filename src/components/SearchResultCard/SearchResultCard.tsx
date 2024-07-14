import {StyledSearchResultCardName, StyledSearchResultCardText, StyledSearchResultCard} from "./styled";
import {SearchResult} from "../Wrapper/Wrapper";


interface Props {
    result: SearchResult;
}

export const SearchResultCard = ({result}: Props) => {

        return (
            <StyledSearchResultCard>
                <StyledSearchResultCardName>
                    {result.name}
                </StyledSearchResultCardName>
                <StyledSearchResultCardText>
                    Homeworld: {result.homeworld}
                </StyledSearchResultCardText>
                <StyledSearchResultCardText>
                    Height: {result.height}
                </StyledSearchResultCardText>
                <StyledSearchResultCardText>
                    Gender: {result.gender}
                </StyledSearchResultCardText>
            </StyledSearchResultCard>
        );

}
