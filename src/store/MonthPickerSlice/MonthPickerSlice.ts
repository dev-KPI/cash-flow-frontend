import { Action, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMonthPickerState } from './MonthPickerInterfaces'


const initialState: IMonthPickerState = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    currentMonth: '',
    currentYear: 0,
}

export const MonthPickerSlice = createSlice({
    name: 'MonthPickerSlice',
    initialState,
    reducers: {
        prevMonth: (state: IMonthPickerState): void => {
            const {currentMonth, months} = state
            if(!months[months.indexOf(currentMonth) - 1]){ 
                state.currentYear -= 1;
                state.currentMonth = 'December';
                return;
            }
            state.currentMonth = months[months.indexOf(currentMonth) - 1]
        },
        nextMonth: (state: IMonthPickerState): void => {
            const {currentMonth, months} = state
            if(!months[months.indexOf(currentMonth) + 1]){ 
                state.currentYear += 1;
                state.currentMonth = 'January';
                return;
            } 
            state.currentMonth = months[months.indexOf(currentMonth) + 1]
        },
        setCurrentDateTime: (state: IMonthPickerState): void => {
            state.currentMonth = state.months[new Date().getMonth()];
            state.currentYear = new Date().getFullYear();
        }
    },
})

export const { prevMonth, nextMonth, setCurrentDateTime } = MonthPickerSlice.actions

export default MonthPickerSlice.reducer