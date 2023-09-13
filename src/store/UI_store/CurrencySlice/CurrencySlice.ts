import { createSlice } from '@reduxjs/toolkit'

//types
import { ICurrencyState } from './CurrencyInterfaces';

const initialState: ICurrencyState = {
    currency: '₴'
}

export const CurrencySlice = createSlice({
    name: 'CurrencySlice',
    initialState,
    reducers: {
        setCurrency: (initialState): void => {
            initialState.currency = (initialState.currency === '₴') ? '$' : '₴'
        },
    },
})

export const { reducer: CurrencyReducer, actions: CurrencyActions } = CurrencySlice;

export default CurrencySlice.reducer