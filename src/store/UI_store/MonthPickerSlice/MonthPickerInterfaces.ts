export interface IMonthPickerState {
    months: string[] 
    type: 'year-month' | 'date-range',
    rangeType: TRangeType
    isPickedWeekMonth: boolean,
    isChangedRange: boolean,
    isChangedRangeFromMount: boolean,
    rangesFromFastNav: boolean,
    startDate: Date, 
    endDate: Date, 
    currentMonth: string
    currentYear: number
}
export type TRangeType = 'today' | 'yesterday' | 'week' | 'lastweek' | 'month' | 'alltime' | 'range' | 'default'