import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice/UserSlice';
import ThemeSlice from './ThemeSlice/ThemeSlice';

export const store = configureStore({
    reducer: {
        UserSlice,
        ThemeSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch