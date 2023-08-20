import IExpense, { IExpensePeriodRangeDates, IExpensePeriodYearMonth } from "@models/IExpense"
import IUser from "@models/IUser"


// create & update 
export interface IExpenseByGroupResponse extends IExpense {
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'> 
}

export interface IGetExpensesBody {
    period: IExpensePeriodYearMonth | IExpensePeriodRangeDates
}
export interface IGetCurrentUserDailyExpensesResponse {
    date: string,
    amount: number
}
export interface IGetCurrentUserDailyExpensesBody {
    period: IExpensePeriodYearMonth | IExpensePeriodRangeDates
}

export interface ICreateExpenseByGroupBody {
    descriptions: string;
    amount: number
    category_id: number
    group_id: number,
}
export interface IUpdateExpenseByGroupBody extends ICreateExpenseByGroupBody {
    id: number,
    icon_url: string,
    color_code: string
}

export interface IGetExpensesByGroupBody {
    group_id: number, 
    period: IExpensePeriodYearMonth | IExpensePeriodRangeDates
}