import { createSlice } from '@reduxjs/toolkit'

//types
import { IUserCategoriesState } from './UserCategoriesInterfaces'
import DateService from '@services/DateService/DateService'


const initialState: IUserCategoriesState = {
    currentGroup: "my"
}

export const UserCategoriesSlice = createSlice({
    name: 'UserCategoriesSlice',
    initialState,
    reducers: {
        // prevGroup: (initialState: IUserCategoriesState): void => {
        //     const { currentGroup } = initialState
        //     if(!months[months.indexOf(currentMonth) - 1]){ 
        //         initialState.currentYear -= 1;
        //         initialState.currentMonth = 'December';
        //         return;
        //     }
        //     initialState.currentMonth = months[months.indexOf(currentMonth) - 1]
        // },
        // nextGroup: (initialState: IUserCategoriesState): void => {
        //     const {currentMonth, months} = initialState
        //     if(!months[months.indexOf(currentMonth) + 1]){ 
        //         initialState.currentYear += 1;
        //         initialState.currentMonth = 'January';
        //         return;
        //     } 
        //     initialState.currentMonth = months[months.indexOf(currentMonth) + 1]
        // },
    },
})

export const { reducer: MonthPickerReducer, actions: MonthPickerActions } = UserCategoriesSlice;

export default UserCategoriesSlice.reducer