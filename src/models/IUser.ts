export default interface IUser {
    id: number,
    login: string,
    first_name: string,
    last_name: string,
    picture: string,
}

export interface IExtendedUser extends Omit<IUser, 'login'> {
    amount: number,
    color_code: string
}