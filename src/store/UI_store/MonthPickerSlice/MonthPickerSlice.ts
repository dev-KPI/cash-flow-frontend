import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    format, isWeekend, isSameDay, subWeeks, subDays, addDays, startOfWeek, endOfWeek,
    startOfMonth, endOfMonth, parseISO, startOfDay, endOfDay, addMonths, subMonths
} from 'date-fns';
//types
import { IMonthPickerState, TRangeType } from './MonthPickerInterfaces'
import DateService from '@services/DateService/DateService'


const initialState: IMonthPickerState = {
    months: DateService.getMonths(),
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    isChangedRange: false,
    isChangedRangeFromMount: false,
    rangeType: 'default',
    isPickedWeekMonth: false,
    rangesFromFastNav: false,
    type: 'year-month',
    currentMonth: DateService.getCurrentMonth(),
    currentYear: new Date().getFullYear(),
}

export const MonthPickerSlice = createSlice({
    name: 'MonthPickerSlice',
    initialState,
    reducers: {
        prevMonth: (initialState: IMonthPickerState): void => {
            const { startDate } = initialState;
            initialState.startDate = startOfMonth(subMonths(new Date(startDate), 1));
            initialState.endDate = endOfMonth(subMonths(new Date(startDate), 1));
        },
        nextMonth: (initialState: IMonthPickerState): void => {
            const { startDate } = initialState;
            initialState.startDate = startOfMonth(addMonths(new Date(startDate), 1))
            initialState.endDate = endOfMonth(addMonths(new Date(startDate), 1)) 
        },
        changeTypeFetchingData: (initialState: IMonthPickerState): void => {
            if(initialState.type === 'date-range') {
                initialState.type = 'year-month'
            }else{
                initialState.type = 'date-range'
            }
        },
        setTypeFetchingData: (initialState: IMonthPickerState, action: PayloadAction<'year-month' | 'date-range'>): void => {
            initialState.type = action.payload
        },
        setRangeType: (initialState: IMonthPickerState, action: PayloadAction<TRangeType>): void => {
            initialState.rangeType = action.payload
        },
        setRangesFromFastNavStatus: (initialState: IMonthPickerState, action: PayloadAction<boolean>): void => {
            initialState.rangesFromFastNav = action.payload
        },
        setIsPickedWeekMonth: (initialState: IMonthPickerState, action: PayloadAction<boolean>): void => {
            initialState.isPickedWeekMonth = action.payload
        },
        setIsChangedRange: (initialState: IMonthPickerState, action: PayloadAction<boolean>) => {
            initialState.isChangedRange = action.payload
        },
        setIsChangedRangeFromMount: (initialState: IMonthPickerState, action: PayloadAction<boolean>) => {
            initialState.isChangedRangeFromMount = action.payload
        },
        setStartDate: (initialState: IMonthPickerState, action: PayloadAction<Date>): void => {
            initialState.startDate = action.payload;
        },
        setEndDate: (initialState: IMonthPickerState, action: PayloadAction<Date>): void => {
            initialState.endDate = action.payload;
        },
        setDateTimeByRangePickerEndDate: (initialState: IMonthPickerState): void => {
            if(new Date(initialState.endDate).getMonth() !== DateService.getMonthIdxByName(initialState.currentMonth)){
                initialState.currentMonth = DateService.getMonthNameByIdx(new Date(subMonths(new Date(initialState.endDate), 1)).getMonth());
                initialState.currentYear = new Date(initialState.endDate).getFullYear();
            }
        },
    },
})

export const { reducer: MonthPickerReducer, actions: MonthPickerActions } = MonthPickerSlice;

export default MonthPickerSlice.reducer