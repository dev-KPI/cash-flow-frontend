import IUser from "@models/IUser";
import { IGetCurrentUserInfo } from "@store/Controllers/UserController/UserControllerInterfaces";

export default interface IHeaderProps {
    User: IGetCurrentUserInfo
}