export interface IUserExpenseChartDataItem { 
    id: number,
    title: string,
    amount: number,
    color: string
}
export interface ICategoryExpenseItemADD {
    id?: number,
    title: string,
    amount: number,
    color: string
}

export interface ICategoryExpenseItemUPDATE {
    id: number,
    title?: string,
    amount?: number,
    color?: string
}