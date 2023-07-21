import ICategory from "@models/ICategory"
import IExpense from "@models/IExpense"
import IGroup from "@models/IGroup"
import IUser from "@models/IUser"


// create & update 
export interface IExpenseByGroupResponse extends IExpense {
    user: Omit<Omit<Omit<IUser, 'first_name'>, 'last_name'>, 'picture'> 
}
export interface IExpenseByGroupBody {
    id:number
    descriptions: string; 
    amount: number
    category_id: number
    group_id: number
}
