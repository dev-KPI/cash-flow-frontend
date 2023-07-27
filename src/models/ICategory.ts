export interface newICategory {
    category: {
        id: number,
        title: string,
    },
    icon_url: string,
    color_code: string
}

export default interface ICategory {
    id: number,
    title: string,
    icon: string,
    color: string
}