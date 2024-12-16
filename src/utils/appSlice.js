import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        isMenuOpen: true
    },
    reducers: {
        toggleMenu: (state) =>{
            state.isMenuOpen = !state.isMenuOpen
        },
        closMenu: (state) => {
            state.isMenuOpen = false
        }
    }
})

export const {toggleMenu, closMenu} = appSlice.actions;
export default appSlice.reducer;