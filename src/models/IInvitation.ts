import IGroup from "./IGroup";
import IUser from "./IUser";

export default interface IInvitation{
    id: number,
    status: string,
    group: IGroup,
    creation_time: string,
    recipient: IUser
}
  