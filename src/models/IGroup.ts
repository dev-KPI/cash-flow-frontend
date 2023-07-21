import IUser from "./IUser";

export default interface IGroup {
    id: number,
    title: string,
    description: string,
    icon_url: string,
    color_code: string,
    admin: IUser,
    status: string,
    date_join: string
}