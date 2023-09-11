import ICategory, { ICategoryAmount } from "@models/ICategory"
import IGroup from "@models/IGroup"
import IUser, { IExtendedUser } from "@models/IUser"
import { IPeriodYearMonth, IPeriodRangeDates } from "@models/IPeriod"
import IListResponse from "@models/IListResponse"
import IMember from "@models/IMember"

export interface IGetCurrentUserGroups {
    user_groups: IGroup[]
}


export interface ICreateGroupBody {
    title: string,
    description: string,
    icon_url: string,
    color_code: string,
}
export interface ICreateGroupResponse extends Omit<Omit<IGroup, 'color_code'>, 'date_join'> { }


export interface IUpdateGroupBody {
    id: number
    title: string,
    description: string,
    icon_url: string,
    color_code: string
}
export interface IUpdateGroupResponse extends Omit<Omit<IGroup, 'icon_url'>, 'date_join'> { }


export interface IGetInfoFromGroupResponse {
    id: number,
    title: string,
    description: string,
    status: string,
    icon_url: string,
    color_code: string,
    admin: IUser,
    members: number,
    expenses: number
}

export interface IGetUsersFromGroupResponse extends IListResponse<{
    users_group: IMember[];
}> {
}

export interface IGetTotalExpensesBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}
export interface IGetTotalExpensesResponse {
    amount: number,
    percentage_increase: number
}

export interface IGetCurrentGroupSpendersResponse extends IExtendedUser { }
export interface IGetCurrentGroupSpendersBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}

export interface IGetGroupExpensesByCategoryResponse extends ICategoryAmount { }

export interface IGetGroupExpensesByCategoryBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}
export interface IGetGroupMemberExpensesByCategoryBody extends IGetGroupExpensesByCategoryBody {
    member_id: number
}
export interface IGetGroupExpensesDailyResponse {
    date: string,
    amount: number
}
export interface IGetGroupExpensesByMemberDailyResponse {
    date: string,
    amount: number,
    users: Omit<IExtendedUser, 'picture'>[]
}

export interface IGetGroupExpensesDailyBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}

export interface IRemoveUserResponse {
    user: IUser,
    status: string,
    date_join: string
}


export interface IGetCategoriesByGroupResponse {
    categories_group: [
        {
            category: ICategory
        }
    ]
}

export interface IGetUserByGroupInfoResponse extends IUser {
    count_expenses: 0,
    total_expenses: {
        amount: 0,
        percentage_increase: 0
    },
    best_category: ICategoryAmount
}

export interface IGetUserByGroupInfoBody {
    group_id: number,
    member_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
}

export interface IGetGroupUsersHistoryResponse extends IListResponse<{
    id: number,
    descriptions: string,
    amount: number,
    time: string,
    category_id: number,
    color_code_category: string,
    title_category: string,
    user_id: number,
    user_login: string,
    user_first_name: string,
    user_last_name: string,
    user_picture: string
}> { };


export interface IGroupMemberExpensesDailyResponse {
    date: string,
    amount: number,
}
export interface IGroupMemberExpensesDailyBody extends IGetUserByGroupInfoBody { }


export interface IGroupMemberExpensesByCategoryDailyResponse {
    date: string,
    amount: number,
    categories: ICategoryAmount[]
}
export interface IGroupMemberExpensesByCategoryDailyBody extends IGetUserByGroupInfoBody { }

export interface IGetGroupMemberHistoryResponse {
    items: [
        {
            id: number,
            descriptions: string,
            amount: number,
            time: string,
            category_id: number,
            color_code_category: string,
            title_category: string,
            user_id: number,
            user_login: string,
            user_first_name: string,
            user_last_name: string,
            user_picture: string
        }
    ],
    total: number,
    page: number,
    size: number,
    pages: number
}