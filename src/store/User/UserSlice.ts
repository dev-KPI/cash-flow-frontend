import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import IUserState from './UserInterfaces';

const initialState: IUserState = {
    isAuth: false,
    isAdmin: false
}

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setIsAuth: (initialState, action: PayloadAction<boolean>): void => {
            initialState.isAuth = action.payload
        },
        setIsAdmin: (initialState, action: PayloadAction<boolean>): void => {
            initialState.isAuth = action.payload
        },
    },
})

export const { reducer: UserSliceReducer, actions: UserSliceActions } = UserSlice;

export default UserSlice.reducer