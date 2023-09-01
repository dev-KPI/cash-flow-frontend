import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import ITooltipState, { ITooltip } from './TooltipSliceInterfaces';

const initialState: ITooltipState = {
    tooltip: {
        shouldShowTooltip: false,
        modeTooltip: 'leave',
        textTooltip: '',
        status: 'success'
    }
}

export const TooltipSlice = createSlice({
    name: 'TooltipSlice',
    initialState,
    reducers: {
        setTooltip: (initialState, action: PayloadAction<ITooltip>): void => {
            initialState.tooltip = action.payload
        },
    },
})

export const { reducer: TooltipSliceReducer, actions: TooltipSliceActions } = TooltipSlice;

export default TooltipSlice.reducer