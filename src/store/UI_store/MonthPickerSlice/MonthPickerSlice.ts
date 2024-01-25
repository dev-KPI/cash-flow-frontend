import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    startOfMonth, endOfMonth, addMonths, subMonths
} from 'date-fns';
//types
import { IMonthPickerState } from './MonthPickerInterfaces'

const initialState: IMonthPickerState = {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
}

export const MonthPickerSlice = createSlice({
    name: 'MonthPickerSlice',
    initialState,
    reducers: {
        prevMonth: (initialState: IMonthPickerState): void => {
            const { endDate } = initialState;
            initialState.startDate = startOfMonth(subMonths(new Date(endDate), 1));
            initialState.endDate = endOfMonth(subMonths(new Date(endDate), 1));
        },
        nextMonth: (initialState: IMonthPickerState): void => {
            const { endDate } = initialState;
            initialState.startDate = startOfMonth(addMonths(new Date(endDate), 1))
            initialState.endDate = endOfMonth(addMonths(new Date(endDate), 1)) 
        },
        setStartDate: (initialState: IMonthPickerState, action: PayloadAction<Date>): void => {
            initialState.startDate = action.payload;
        },
        setEndDate: (initialState: IMonthPickerState, action: PayloadAction<Date>): void => {
            initialState.endDate = action.payload;
        }
    },
})

export const { reducer: MonthPickerReducer, actions: MonthPickerActions } = MonthPickerSlice;

export default MonthPickerSlice.reducer