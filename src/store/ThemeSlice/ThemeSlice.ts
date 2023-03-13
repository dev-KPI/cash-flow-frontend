import { createSlice } from '@reduxjs/toolkit'
import { IThemeState } from './ThemeInterfaces';


const initialState: IThemeState = {
    theme: 'light',
    requireReload: true
}

export const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState,
    reducers: {
        setTheme: (state): void => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            state.requireReload = false
        },
        setThemeDefault: (state): void => {
            state.theme = 'light'
            state.requireReload = false
        },
    },
})

export const { setTheme, setThemeDefault } = ThemeSlice.actions
export default ThemeSlice.reducer