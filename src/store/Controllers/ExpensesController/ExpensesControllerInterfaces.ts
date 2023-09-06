import IExpense from "@models/IExpense"
import { IPeriodRangeDates, IPeriodYearMonth } from "@models/IPeriod";
import IUser from "@models/IUser"


// create & update 
export interface IExpenseByGroupResponse extends IExpense {
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'>
}

export interface IGetExpensesBody {
    period: IPeriodYearMonth | IPeriodRangeDates
}

export interface ICreateExpenseByGroupBody {
    descriptions: string;
    amount: number
    category_id: number
    group_id: number,
}
export interface IUpdateExpenseByGroupBody {
    group_id: number,
    expense_id: number,
    descriptions: string,
    amount: number,
}

export interface IGetExpensesByGroupBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}

