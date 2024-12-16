import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import videoSlice from "./videoSlice"

const appStore = configureStore({
    reducer: {
        app: appSlice,
        search: searchSlice,
        video: videoSlice
    }
})

export default appStore;