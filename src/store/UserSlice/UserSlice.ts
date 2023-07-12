import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from './UserInterfaces';


const initialState: IUserState = {
    firebaseId: '',
    name: '',
    surname: '',
    email: '',
    photo: '',
}

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUserCredentials: (state, action: PayloadAction<IUserState>) => {
            state.firebaseId = action.payload.firebaseId;
            state.name = action.payload.name;
            state.surname = action.payload.surname.length > 1 ? action.payload.surname : '';
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },
        setNullCredentials: (state) => {
            state.firebaseId = '';
            state.name = '';
            state.surname = '';
            state.email = '';
            state.photo = '';
        }
    },
})
export const { reducer: UserSliceReducer, actions: UserSliceActions } = UserSlice;

export default UserSlice.reducer