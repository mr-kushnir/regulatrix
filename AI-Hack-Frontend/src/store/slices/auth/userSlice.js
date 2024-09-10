import {createSlice} from '@reduxjs/toolkit';
import {initialState} from "./state.js";


const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = {};
        },
        setUser(state, action) {
            console.log(action.payload)
            state.user = action.payload;
        }
    },
});

export default userSlice.reducer;
export const {logout, setUser} = userSlice.actions;
