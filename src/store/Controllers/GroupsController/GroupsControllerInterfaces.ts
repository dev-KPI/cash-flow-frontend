import ICategory, { ICategoryAmount } from "@models/ICategory"
import IGroup from "@models/IGroup"
import IUser, { IExtendedUser } from "@models/IUser"
import { IPeriodYearMonth, IPeriodRangeDates } from "@models/IPeriod"
import IListResponse from "@models/IListResponse"

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
export interface IUpdateGroupResponse extends Omit<Omit<IGroup, 'icon_url'>, 'date_join'>  {}


export interface IGetInfoFromGroupResponse {
    id: number,
    title: string,
    description: string,
    status: string,
    icon_url: string,
    color_code: string,
    admin: {
        id: number,
        login: string,
        first_name: string,
        last_name: string,
        picture: string
    },
    members: number,
    expenses: number
}

export interface IGetGroupExpensesByCategoryResponse extends ICategoryAmount { }

export interface IGetGroupExpensesByCategoryBody {
    group_id: number,
    period: IPeriodYearMonth | IPeriodRangeDates
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