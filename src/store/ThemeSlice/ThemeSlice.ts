import { createSlice } from '@reduxjs/toolkit'
import { IThemeState } from './ThemeInterfaces';

const initialState: IThemeState = {
    theme: 'light',
}

export const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState,
    reducers: {
        setTheme: (initialState): void => {
            initialState.theme = (initialState.theme === 'light') ? 'dark' :  'light'
            const body = document.querySelector('body') as HTMLElement;
            body.setAttribute('data-theme', initialState.theme);
        },
    },
})

export const { setTheme } = ThemeSlice.actions

export default ThemeSlice.reducer