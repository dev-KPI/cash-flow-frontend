export interface IPeriodYearMonth {
    year_month: string
}
export interface IPeriodRangeDates {
    start_date: string,
    end_date: string
}

export interface IPeriods {
    period: {
        year_month?: string,
        start_date?: string,
        end_date?: string
    }
}