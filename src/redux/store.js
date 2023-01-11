import { configureStore } from "@reduxjs/toolkit";

import SliceFavorite from './Slice/SliceFavorite'

export const store = configureStore({
    reducer:{
        favorites:SliceFavorite.reducer
        
    }
})