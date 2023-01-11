import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const SliceFavorite = createSlice({
    name:'favorites',
    initialState:{
        products:[]
    },
    reducers:{
        adProductToFavorite:(state,action)=>{
            state.products.push(action.payload)
            toast.success('Product added to favorite!')
        },
        removeFromFavorite:(state,action)=>{
            state.products.splice(state.products.findIndex(product=> product.id ===action.payload),1)
            toast.success('Product deleted from favorite!')

        },
        removeAllProducts:(state)=>{
            state.products=[]
            toast.success('cleared favorite!')

        }

    }
})

export const {adProductToFavorite,removeFromFavorite,removeAllProducts} = SliceFavorite.actions
export default SliceFavorite