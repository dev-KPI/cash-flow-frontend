import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import { IMonthPickerState } from './MonthPickerInterfaces'
import DateService from '@services/DateService/DateService'


const initialState: IMonthPickerState = {
    months: DateService.getMonths(),
    startDate: new Date().toISOString(), 
    endDate: new Date().toISOString(), 
    type: 'year-month',
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
        changeTypeFetchingData: (initialState: IMonthPickerState): void => {
            if(initialState.type === 'date-range') {
                initialState.type = 'year-month'
            }else{
                initialState.type = 'date-range'
            }
        },
        setStartDate: (initialState: IMonthPickerState, action: PayloadAction<string>): void => {
            initialState.startDate = action.payload;
        },
        setEndDate: (initialState: IMonthPickerState, action: PayloadAction<string>): void => {
            initialState.endDate = action.payload;
        },
        setNullDate: (initialState: IMonthPickerState): void => {
            initialState.startDate = new Date().toISOString();
            initialState.endDate = new Date().toISOString();
        },
        setCurrentDateTime: (initialState: IMonthPickerState): void => {
            initialState.currentMonth = DateService.getCurrentMonth();
            initialState.currentYear = new Date().getFullYear();
        },
        setDateTimeByRangePickerEndDate: (initialState: IMonthPickerState): void => {
            if(new Date(initialState.endDate).getMonth() !== DateService.getMonthIdxByName(initialState.currentMonth)){
                initialState.currentMonth = DateService.getMonthNameByIdx(new Date(initialState.endDate).getMonth());
                initialState.currentYear = new Date(initialState.endDate).getFullYear();
            }
        },
    },
})

export const { reducer: MonthPickerReducer, actions: MonthPickerActions } = MonthPickerSlice;

export default MonthPickerSlice.reducer