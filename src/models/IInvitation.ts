import IGroup from "./IGroup";

export default interface IInvitation{
    id: number,
    status: string,
    group: IGroup['group']
    creation_time: string,
}
  