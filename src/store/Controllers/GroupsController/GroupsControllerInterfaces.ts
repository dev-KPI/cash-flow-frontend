import ICategory from "@models/ICategory"
import IGroup from "@models/IGroup"
import IUser from "@models/IUser"


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


export interface IGetUsersFromGroupResponse {
    users_group: [
        {
            user: IUser
            status: string,
            date_join: string
        }
    ]
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