export interface IMonthPickerState {
    months: string[] 
    type: 'year-month' | 'date-range',
    rangesFromFastNav: boolean,
    startDate: string, 
    endDate: string, 
    currentMonth: string
    currentYear: number
}