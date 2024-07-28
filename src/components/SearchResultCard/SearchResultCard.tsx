import {StyledSearchResultCardName, StyledSearchResultCardText, StyledSearchResultCard} from "./styled";
import {SearchResult} from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";

// Define state type
import {markItem, unMarkItem} from "../../api/markedItemsSlice/markedItemsSlice"
import {RootState} from "../../api/store";
import {useEffect, useState} from "react";

interface Props {
    result: SearchResult;
}

export const SearchResultCard = ({result}: Props) => {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.selected.items);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const isItemSelected = selected.some((item: SearchResult) => item.name === result.name);
        isItemSelected ? setIsSelected(true) : setIsSelected(false);
    }, [isSelected, selected]);

    const toggleAddToStore = (e: boolean) => {
        e ? dispatch(markItem(result)) : dispatch(unMarkItem(result.name));
    }

        return (
            <StyledSearchResultCard>
                <input checked={isSelected} type={"checkbox"} onChange={(e) => toggleAddToStore(e.target.checked)}/>
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
