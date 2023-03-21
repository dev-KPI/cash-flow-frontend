import { createSlice } from '@reduxjs/toolkit'

//types
import { IThemeState } from './ThemeInterfaces';

const initialState: IThemeState = {
    theme: 'light',
    cardBackgroundColor:'0F0F0F',
    backgroundColor: '#151515',
    mainTextColor:'#EAEAEA',
    textColor:'#9BABC5',
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
            initialState.backgroundColor = (initialState.theme === 'light') ? '#151515' : '#F8F8FF'
            initialState.mainTextColor = (initialState.theme === 'light') ? '#EAEAEA': '#333333'
            initialState.textColor = (initialState.theme === 'light') ? '#9BABC5': '#7A7A9D'
            const body = document.querySelector('body') as HTMLElement;
            body.setAttribute('data-theme', initialState.theme);
        },
    },
})

export const { reducer: ThemeReducer, actions: ThemeActions } = ThemeSlice;

export default ThemeSlice.reducer