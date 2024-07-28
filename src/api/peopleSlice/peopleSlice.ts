import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PeopleApiResponse } from '../../utils/types';

export const peopleApi = createApi({
    reducerPath: 'peopleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        searchPeople: builder.query<PeopleApiResponse, { searchQuery: string; page: number }>({
            query: ({ searchQuery, page }) => `people/?search=${searchQuery}&page=${page}`,
            // keepUnusedDataFor: 6000,
            // refetchOnMountOrArgChange: true
        }),
    }),
});

export const { useSearchPeopleQuery } = peopleApi;
