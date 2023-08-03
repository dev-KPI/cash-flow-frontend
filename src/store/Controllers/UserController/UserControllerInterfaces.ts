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