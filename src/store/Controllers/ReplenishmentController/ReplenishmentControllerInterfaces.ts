import {IPeriods } from "@models/IPeriod";
import IUser from "@models/IUser";


export interface IGetReplenishmentsByUserBody extends IPeriods {}
export interface IGetReplenishmentsByUserResponse {
    amount: number,
    descriptions: string,
    time: string
}

export interface ICreateReplenishmentBody {
    amount: number,
    descriptions: string
}
export interface ICreateReplenishmentResponse {
    id: number,
    amount: number,
    descriptions: string,
    time: string,
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'>
}


export interface IUpdateReplenishmentBody {
    id: number,
    amount: number,
    descriptions: string
}
export interface IUpdateReplenishmentResponse {
    id: number,
    amount: number,
    descriptions: string,
    time: string,
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'>
}

export interface IDeleteReplenishmentBody {
    id: number
}