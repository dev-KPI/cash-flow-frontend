import IGroup from "@models/IGroup"
import IUser from "@models/IUser"

export type TGroup_id = number

export interface IUserGroups_GET { user_groups: IGroup[] }
export interface IUserGroup_CREATE extends Omit<Omit<Omit<Omit<IGroup, 'id'>, 'admin'>, 'status'>, 'date_join'>  {}
export interface IUserGroup_UPDATE extends Omit<Omit<Omit<IGroup, 'admin'>, 'status'>, 'date_join'>  {}
