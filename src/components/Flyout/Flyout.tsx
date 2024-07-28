
import { StyledFlyoutWrap } from "./styled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../api/store";
import {removeAll} from "../../api/markedItemsSlice/markedItemsSlice"
import ObjectToCSV from "../../utils/objectToCsv";


export const Flyout = () => {
    const selected = useSelector((state: RootState) => state.selected.items);
    const dispatch = useDispatch();
    const handleRemoveAll = () => {
        dispatch(removeAll());
    };

    if (selected && selected.length) {
        return (
            <StyledFlyoutWrap>
                <span>{selected && selected.length} items are selected</span>
                <div>
                    <button onClick={handleRemoveAll}>Unselect All</button>
                    <ObjectToCSV data={selected} fileName={"dataExport"}></ObjectToCSV>
                </div>
            </StyledFlyoutWrap>
        );
    } else {
        <></>
    }


};
