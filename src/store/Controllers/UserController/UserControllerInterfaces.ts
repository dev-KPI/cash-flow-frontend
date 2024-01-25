import { ICategoryAmount } from "@models/ICategory";
import { IPeriods } from "@models/IPeriod";
import IUser from "@models/IUser";

export interface IGetCurrentUserInfo extends IUser{}

export interface IGetCurrentUserBalance {
    balance: number
}
export interface IGetCurrentUserDailyExpensesResponse {
    date: string,
    amount: number
}

export interface IGetUserExpensesByGroupResponse {
    group_id: number,
    group_title: string,
    categories: ICategoryAmount[]
}

export interface IGetUserExpensesByGroupBody {
    group_id: number,
    period: IPeriods
}
export interface IGetTotalExpensesResponse {
    amount: number,
    percentage_increase: number
}
export interface IGetTotalReplenishmentsResponse extends IGetTotalExpensesResponse{}
export interface IGetTotalExpensesBody extends IPeriods {}
export interface IGetTotalReplenishmentsBody extends IGetTotalExpensesBody { }

export interface IGetUserExpensesByCategoryResponse extends ICategoryAmount {}

export interface IGetUserExpensesByCategoryBody extends IPeriods {}

