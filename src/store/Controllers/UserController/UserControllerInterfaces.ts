import { IPeriodRangeDates, IPeriodYearMonth } from "@models/IPeriod";
import IUser from "@models/IUser";

export interface IGetCurrentUserInfo extends IUser{}

export interface IGetCurrentUserBalance {
    balance: number
}

export interface IGetUsersFromGroupResponse {
    users_group: [
        {
            user: IUser
            status: string,
            date_join: string
        }
    ]
}
export interface IGetTotalExpensesResponse {
    amount: number,
    percentage_increase: number
}
export interface IGetTotalReplenishmentsResponse extends IGetTotalExpensesResponse{}
export interface IGetExpensesBody {
    period: IPeriodYearMonth | IPeriodRangeDates
}