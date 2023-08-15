export interface IMonthPickerState {
    months: string[] 
    type: 'year-month' | 'date-range'
    startDate: string, 
    endDate: string, 
    currentMonth: string
    currentYear: number
}