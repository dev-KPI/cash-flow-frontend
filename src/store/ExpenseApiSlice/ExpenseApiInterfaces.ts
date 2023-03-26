type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface IExpenseItem { 
    id: number, 
    description: string,
    amount: number,
    time: string,
    user_id: number,
    group_id: number,
    category_id: number
}

export interface IExpenseItemUPDATE { 
    id: number, 
    description?: string,
    amount?: number,
    time?: string,
    user_id?: number,
    group_id?: number,
    category_id?: number
}
export interface IExpenseItemADD { 
    id?: number, 
    description: string,
    amount: number,
    time: string,
    user_id: number,
    group_id: number,
    category_id: number
}