import { ActionCreatorsMapObject, PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import { IExpenseChartDataItem, IExpenseChartState } from './ExpenseChartInterfaces'
import DateService from '@services/DateService/DateService'
import { IMonthPickerState } from '../MonthPickerSlice/MonthPickerInterfaces'
import { IDatesPerTime } from '@services/DateService/DateServiceInterfaces'

const initialState: IExpenseChartState = {
    displayRangeCurrent: 'monthly',
    rangeOverall: ['yearly','monthly','weekly'],
    monthIdx: DateService.getCurrentMonthIdx(),
    daysInMonth: 0,
    data: []
}

export const ExpenseChartSlice = createSlice({
    name: 'ExpenseChartSlice',
    initialState,
    reducers: {
        getDataByMonth: (initialState: IExpenseChartState, action: PayloadAction<string>): void => {
            const datesPerSomeMonth = DateService.getArrayFromDatesPerSomeMonth(DateService.getMonthIdxByName(action.payload))
            DateService.sortArrayByDate(datesPerSomeMonth)
            initialState.data = datesPerSomeMonth.map(el => {
                return {
                    key: el.date + '', 
                    value: el.date*33, 
                    datetime: el
                }
            })
            initialState.daysInMonth = DateService.getDaysInSomeMonth(DateService.getMonthIdxByName(action.payload))
        },
        getDataByLastWeek: (initialState: IExpenseChartState): void => {
            const datesPerLastWeek = DateService.getArrayFromDatesPerLastSevenDays()
            DateService.sortArrayByDate(datesPerLastWeek)
            initialState.data = datesPerLastWeek.map(el => {
                return {
                    key: el.date + '', 
                    value: el.date*32, 
                    datetime: el
                }
            })
        },
        getDataByYearPerMonth: (initialState: IExpenseChartState, action: PayloadAction<{year?: number}>): void => {
            const datesPerYear = DateService.getArrayFromDatesPerYear(action.payload.year)
            let year = action.payload.year;
            if (!year){year = DateService.getCurrentYear()}
            DateService.sortArrayByMonth(datesPerYear)

            let statsByMonths: IExpenseChartDataItem[] = []
            for (let item of datesPerYear){
                if(statsByMonths.length < 11){
                    statsByMonths.push(...DateService.getMonths().map(el => {return {
                        key: el, 
                        value: 300, 
                        datetime: item
                    }}))
                } else {
                    for(let i = 0; i < 12; i++){
                        if(statsByMonths[i].key === item.month){
                            statsByMonths[i].value += item.date
                        }
                    }
                }
            }
            initialState.data = [...statsByMonths.map(el => {
                return {
                    key: el.key, 
                    value: el.value * 30, 
                    datetime: el.datetime
                }
            })]
        },
        setDisplayRangeCurrent: (initialState: IExpenseChartState, action: PayloadAction<string>): void => {
            initialState.displayRangeCurrent = action.payload
        },
    },
})

export const { reducer: ExpenseChartStore, actions: ExpenseChartActions } = ExpenseChartSlice;

export default ExpenseChartSlice.reducer