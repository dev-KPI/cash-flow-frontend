export default interface ICategory {
    category: {
        id: number,
        title: string,
    },
    icon_url: string,
    color_code: string
}

export interface ICategoryAmount {
    id: number,
    title: string,
    color_code: string,
    icon_url: string,
    amount: number
}
