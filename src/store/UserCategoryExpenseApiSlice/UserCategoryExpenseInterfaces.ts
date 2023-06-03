import IUser from "@models/IUser"

export interface IUserExpenseChartDataItem { 
    category: {
        id: number,
        title: string,
        color: string
    },
    amount: number

}
export interface ICategoryExpenseItemADD {
    category: {
        id?: number,
        title: string,
        color: string
    },
    amount: number,
}

export interface ICategoryExpenseItemUPDATE {
    category: {
        id: number,
        title?: string,
        color?: string
    },
    amount?: number,
}