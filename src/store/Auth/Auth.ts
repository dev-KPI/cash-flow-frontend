import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export interface IAuthState {
    user: string,
    token: string,
}
const initialState: IAuthState = {
    user: '',
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {

        }
    }   
})
