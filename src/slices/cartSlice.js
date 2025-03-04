import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem('totalItems')? JSON.parse(localStorage.getItem('totalItems')): 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        },

        // add to cart
        addToCart(state, value) {
            state.totalItems++;
        },

        // remove from cart
        removeFromCart(state, value) {
            state.totalItems--;
        },
        // reset Cart

        resetCart(state, value) {
            state.totalItems = value.payload;
        }
    }
})

export const {setTotalItems, resetCart, addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;