import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {

    cart: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [],

    totalItems: localStorage.getItem('totalItems')? JSON.parse(localStorage.getItem('totalItems')): 0,

    total: localStorage.getItem('total')? JSON.parse(localStorage.getItem('total')) : 0,
    
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

        // add to cart
        addToCart(state, action) {
            const course = action.payload;

            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                toast.error("Course already in cart")
                return;
            }
            // add course to the cart
            state.cart.push(course);

            // add course price to total price
            state.total += course?.price;

            // add total number of courses in cart
            state.totalItems++;

            // update localstorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('total', JSON.stringify(state.total));
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems));

            toast.success('Course added.')
        },

        // remove from cart
        removeFromCart(state, action) {
            const course = action.payload;

            const index = state.cart.findIndex((item) => item._id === course._id);
        
            if (index < 0) {
                toast.error('Course not in cart')
                return;
            }

            state.totalItems--;
            state.total -= course.price;

            state.cart.splice(index, 1);

            // update localstorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('total', JSON.stringify(state.total));
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems));

            toast.success('Course removed.')

        },

        // reset Cart
        resetCart(state, action) {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem('cart');
            localStorage.removeItem('total')
            localStorage.removeItem('totalItems');
        }
    }
})

export const {setTotalItems, resetCart, addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;