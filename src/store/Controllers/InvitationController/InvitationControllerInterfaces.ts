import IInvitation from "@models/IInvitation";
import IUser from "@models/IUser";

export interface IGetInvitaionResponse extends IInvitation {}


export interface ICreateInvitaionBody {
    recipient_id: number,
    group_id: number
}
export interface ICreateInvitaionResponse extends IInvitation {
    recipient: IUser
}


export interface IResponseInvitationBody {
    invitation_id: number,
    response: 'ACCEPTED' | 'DENIED'
}
export interface IResponseInvitationResponse extends IInvitation {
    recipient: IUser
}