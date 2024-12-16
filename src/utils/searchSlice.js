import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        suggestions: {},
        videos:[]
    },
    reducers: {
        cacheResults: (state, action) => {
           state.suggestions = {...state.suggestions, ...action.payload}
        },
        searchVideos: (state, action) => {
            state.videos = action.payload
        }
    }
})

export const {cacheResults, searchVideos} = searchSlice.actions;
export default searchSlice.reducer;