import { configureStore } from "@reduxjs/toolkit";
import { peopleApi } from "./peopleSlice/peopleSlice";
import markedItemsReducer from "./markedItemsSlice/markedItemsSlice";

export const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
    selected: markedItemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(peopleApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
