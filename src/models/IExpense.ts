export default interface IExpense {
    id: number,
    descriptions: string,
    amount: number,
    time: string,
    category_group: {
        group: {
            id: number
            title: string
        },
        category: {
            id: number
            title: string
        },
        color_code: string,
        icon_url: string
    }
}

export interface IExpensePeriodYearMonth {
    year_month: string 
} 
export interface IExpensePeriodRangeDates {
    start_date: string,
    end_date: string
}