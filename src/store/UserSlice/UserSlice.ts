import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from './UserInterfaces';


const initialState: IUserState = {
    int: 0
}

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setInt: (state, action: PayloadAction<number>) => {
            state.int = action.payload
        },
    },
})

export const { setInt } = UserSlice.actions

export default UserSlice.reducer