export default interface IHistoryItem{
    id: number,
    descriptions: string,
    amount: number,
    time: Date
    category_id: number,
    group_id: number,
    color_code_category: string,
    title_category: string,
    title_group: string,
    color_code_group: string
}

export interface IGroupHistoryItem {
    id: number,
    descriptions: string,
    amount: number,
    time: string,
    category_id: number,
    color_code_category: string,
    title_category: string,
    user_id: number,
    user_login: string,
    user_first_name: string,
    user_last_name: string,
    user_picture: string
}