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