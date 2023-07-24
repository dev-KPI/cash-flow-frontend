import IInvitation from "@models/IInvitation";

export interface IGetInvitaionResponse extends Omit<IInvitation, 'recipient'> {}


export interface ICreateInvitaionBody {
    recipient_id: number,
    group_id: number
}
export interface ICreateInvitaionResponse extends IInvitation {}


export interface IAcceptInvitationBody {
    invitation_id: number,
    response: 'ACCEPTED' | 'DENIED'
}
export interface IAcceptInvitationResponse extends IInvitation {}