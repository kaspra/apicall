import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createSlice,
  configureStore,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface APICALL{
    id: number;
    name: string;
    description: string;
    image_url: string | undefined;
    brewers_tips: string;
    contributed_by: string;
}

const apicall = createApi({
    reducerPath: "apicall",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (builder) => ({
        getAPI: builder.query<APICALL[], undefined>({
            query: () => "https://api.punkapi.com/v2/beers",
        })
    })
})

export const useAPI = apicall.endpoints.getAPI.useQuery;

const search = createSlice({
    name: "search",
    initialState: {
        search: "",
    },
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
})

export const { setSearch } = search.actions;

export const store = configureStore({
    reducer: {
        search: search.reducer,
        apicall: apicall.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apicall.middleware),
});

export type ReactState = ReturnType<typeof store.getState>;

export const selectSearch = (state: ReactState) => state.search.search;