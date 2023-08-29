import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import IGroupState, { ITooltip } from './GroupInterfaces';

const initialState: IGroupState = {
    defaultGroup: 0,
    tooltip: {
        shouldShowTooltip: false,
        modeTooltip: 'leave',
        textTooltip: '',
        status: 'success'
    }
}

export const GroupSlice = createSlice({
    name: 'GroupSlice',
    initialState,
    reducers: {
        setDefaultGroup: (initialState, action: PayloadAction<number>): void => {
            initialState.defaultGroup = action.payload
        },
        setTooltip: (initialState, action: PayloadAction<ITooltip>): void => {
            initialState.tooltip = action.payload
        },
    },
})

export const { reducer: GroupSliceReducer, actions: GroupSliceActions } = GroupSlice;

export default GroupSlice.reducer