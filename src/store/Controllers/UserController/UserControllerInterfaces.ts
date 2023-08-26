import { ICategoryAmount, ISimplifiedCategory } from "@models/ICategory";
import { IPeriodRangeDates, IPeriodYearMonth } from "@models/IPeriod";
import IUser from "@models/IUser";

export interface IGetCurrentUserInfo extends IUser{}

export interface IGetCurrentUserBalance {
    balance: number
}

export interface IGetUsersFromGroupResponse {
    items: [
        {
            users_group: [
                {
                    user: IUser
                    status: string,
                    date_join: string
                }
            ]
        }
    ],
    total: 0,
    page: 0,
    size: 0,
    pages: 0
}
export interface IGetTotalExpensesResponse {
    amount: number,
    percentage_increase: number
}
export interface IGetTotalReplenishmentsResponse extends IGetTotalExpensesResponse{}
export interface IGetTotalExpensesBody {
    period: IPeriodYearMonth | IPeriodRangeDates
}
export interface IGetTotalReplenishmentsBody extends IGetTotalExpensesBody { }

export interface IGetUserExpensesByGroupResponse {
    group_id: number,
    group_title: string,
    categories: ICategoryAmount[]
}

export interface IGetUserExpensesByGroupBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates;
}

export interface IGetUserExpensesByCategoryResponse extends ISimplifiedCategory {}

export interface IGetUserExpensesByCategoryBody {
    period: IPeriodYearMonth | IPeriodRangeDates;
}

