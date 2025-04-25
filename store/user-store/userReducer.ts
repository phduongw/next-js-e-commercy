import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    username: string;
}

const initialState: UserState = {
    username: ""
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload;
        },
        resetUserSlice(state) {
            state.username = "";
        }
    }
});

export const { setUser, resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
