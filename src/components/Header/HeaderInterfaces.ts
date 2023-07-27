import IUser from "@models/IUser";

export default interface IHeaderProps {
    userCredentials?: Omit<IUser, 'id'>
}