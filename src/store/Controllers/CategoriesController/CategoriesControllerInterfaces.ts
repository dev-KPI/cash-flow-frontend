import ICategory from "@models/ICategory";


export interface ICreateCategoryBody {
    group_id: number
    icon_url: string,
    color_code: string,
    title: string
}
export interface ICreateCategoryResponse extends Omit<Omit<ICategory, 'icon_url'>, 'color_code'> {}


export interface IUpdateCategoryBody {
    group_id: number,
    category_id: number,
    icon_url: string,
    color_code: string,
    title: string
}
export interface IUpdateCategoryResponse extends Omit<Omit<ICategory, 'icon_url'>, 'color_code'> {}


export interface IGetCategoriesByGroupResponse {
    categories_group: ICategory[]
}

export interface IGetGroupsCategoriesResponse {
    id: number
    icon_url: string,
    color_code: string,
    title: string,
    categories_group: ICategory[]
}