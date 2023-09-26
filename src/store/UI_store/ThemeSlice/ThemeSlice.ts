import { createSlice } from '@reduxjs/toolkit'

//types
import { IThemeState } from './ThemeInterfaces';

const initialState: IThemeState = {
    theme: new Date().getHours() > 19 ? 'dark' : 'light',
    cardBackgroundColor: new Date().getHours() > 19 ? '#FFFFFF' : '0F0F0F',
    backgroundColor: new Date().getHours() > 19 ? '#151515' : '#F8F8FF',
    mainTextColor: new Date().getHours() > 19 ? '#EAEAEA' : '#333333',
    textColor: new Date().getHours() > 19 ? '#9BABC5' : '#7A7A9D'
}

export const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState,
    reducers: {
        initializeTheme: (initialState): void => {
            const body = document.querySelector('body') as HTMLElement;
            body.setAttribute('data-theme', initialState.theme);
        },
        setTheme: (initialState): void => {
            initialState.theme = (initialState.theme === 'light') ? 'dark' : 'light'
            initialState.cardBackgroundColor = (initialState.theme === 'light') ? '0F0F0F': '#FFFFFF'
            initialState.backgroundColor = (initialState.theme === 'light') ? '#F8F8FF' : '#151515'
            initialState.mainTextColor = (initialState.theme === 'light') ? '#333333' : '#EAEAEA'
            initialState.textColor = (initialState.theme === 'light') ? '#7A7A9D' : '#9BABC5'
            const body = document.querySelector('body') as HTMLElement;
            body.setAttribute('data-theme', initialState.theme);
        },
    },
})

export const { reducer: ThemeReducer, actions: ThemeActions } = ThemeSlice;

export default ThemeSlice.reducer