import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../../utils/types';


export interface SelectedCards {
    items: Array<SearchResult>
}

const initialState: SelectedCards = {
    items: []
};

export const markedItemsSlice = createSlice({
    name: "selectedCards",
    initialState,
    reducers: {
        markItem: (state, action: PayloadAction<SearchResult>) => {
            console.log("push", action);
            state.items.push(action.payload);
        },
        unMarkItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.name !== action.payload);
        },
        removeAll: (state) => {
            state.items = [];
        }
    },
})
// Create and extract actions
export const { markItem, unMarkItem, removeAll } = markedItemsSlice.actions
// Create and extract actions
export default markedItemsSlice.reducer
