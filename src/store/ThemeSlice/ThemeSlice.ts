import { createSlice } from '@reduxjs/toolkit'
import { IThemeState } from './ThemeInterfaces';


const initialState: IThemeState = {
    type: 'light'
}

export const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState,
    reducers: {
        setAnotherTheme: (state) => {
            state.type = state.type === 'light' ? 'dark' : 'light'
        },
    },
})

export const { setAnotherTheme } = ThemeSlice.actions

export default ThemeSlice.reducer