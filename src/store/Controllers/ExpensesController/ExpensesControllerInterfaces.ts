import IExpense, { IExpensePeriodRangeDates, IExpensePeriodYearMonth } from "@models/IExpense"
import IUser from "@models/IUser"


// create & update 
export interface IExpenseByGroupResponse extends IExpense {
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'> 
}


export interface IUpdateExpenseByGroupBody {
    id:number
    descriptions: string; 
    amount: number
    category_id: number
    group_id: number,
    icon_url: string,
    color_code: string
}

export interface ICreateExpenseByGroupBody extends Omit<IUpdateExpenseByGroupBody, "id"> {}

export interface IGetExpensesByGroupBody {
    group_id: number, 
    period: IExpensePeriodYearMonth | IExpensePeriodRangeDates
}