import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token")?JSON.parse(localStorage.getItem('token')): null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload;
        },

        setLoading(state, action) {
            state.loading = action.payload
        },

        setSignupData(state, action) {
            state.signupData = action.payload
        }
    }
})

export const {setToken, setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;
