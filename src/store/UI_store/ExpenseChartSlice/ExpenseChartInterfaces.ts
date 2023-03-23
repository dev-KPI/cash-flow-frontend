import { IDatesPerTime } from "@services/DateService/DateServiceInterfaces"

export interface IExpenseChartDataItem { 
    key: string, 
    value: number,
    datetime: IDatesPerTime 
}

export interface IExpenseChartState {
    displayRangeCurrent: string,
    rangeOverall: string[],
    monthIdx: number,
    daysInMonth: number,
    data: IExpenseChartDataItem[]
}