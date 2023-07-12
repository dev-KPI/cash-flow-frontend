import { createSlice } from '@reduxjs/toolkit'

//types
import { IMonthPickerState } from './MonthPickerInterfaces'
import DateService from '@services/DateService/DateService'


const initialState: IMonthPickerState = {
    months: DateService.getMonths(),
    currentMonth: DateService.getCurrentMonth(),
    currentYear: new Date().getFullYear(),
}

export const MonthPickerSlice = createSlice({
    name: 'MonthPickerSlice',
    initialState,
    reducers: {
        prevMonth: (initialState: IMonthPickerState): void => {
            const {currentMonth, months} = initialState
            if(!months[months.indexOf(currentMonth) - 1]){ 
                initialState.currentYear -= 1;
                initialState.currentMonth = 'December';
                return;
            }
            initialState.currentMonth = months[months.indexOf(currentMonth) - 1]
        },
        nextMonth: (initialState: IMonthPickerState): void => {
            const {currentMonth, months} = initialState
            if(!months[months.indexOf(currentMonth) + 1]){ 
                initialState.currentYear += 1;
                initialState.currentMonth = 'January';
                return;
            } 
            initialState.currentMonth = months[months.indexOf(currentMonth) + 1]
        },
        setCurrentDateTime: (initialState: IMonthPickerState): void => {
            initialState.currentMonth = DateService.getCurrentMonth();
            initialState.currentYear = new Date().getFullYear();
        }
    },
})

export const { reducer: MonthPickerReducer, actions: MonthPickerActions } = MonthPickerSlice;

export default MonthPickerSlice.reducer