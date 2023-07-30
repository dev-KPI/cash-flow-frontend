import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import IGroupState from './GroupInterfaces';

const initialState: IGroupState = {
    defaultGroup: 0
}

export const GroupSlice = createSlice({
    name: 'GroupSlice',
    initialState,
    reducers: {
        setDefaultGroup: (initialState, action: PayloadAction<number>): void => {
            initialState.defaultGroup = action.payload
        },
    },
})

export const { reducer: GroupSliceReducer, actions: GroupSliceActions } = GroupSlice;

export default GroupSlice.reducer