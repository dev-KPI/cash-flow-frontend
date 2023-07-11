import { createSlice } from '@reduxjs/toolkit'

//types
import { IThemeState } from './ThemeInterfaces';

const initialState: IThemeState = {
    theme: 'light',
    cardBackgroundColor:'0F0F0F',
    backgroundColor: '#151515',
    mainTextColor:'#333333',
    textColor:'#7A7A9D',
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