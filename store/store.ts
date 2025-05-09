import { configureStore } from '@reduxjs/toolkit';

import userReducer from "@/store/user-store/userReducer";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;