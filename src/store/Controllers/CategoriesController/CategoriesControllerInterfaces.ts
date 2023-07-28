import ICategory, { newICategory } from "@models/ICategory";


export interface ICreateCategoryBody {
    group_id: number
    icon_url: string,
    color_code: string,
    title: string
}
export interface ICreateCategoryResponse extends Omit<Omit<newICategory, 'icon_url'>, 'color_code'> {}


export interface IUpdateCategoryBody {
    group_id: number,
    category_id: number,
    icon_url: string,
    color_code: string,
    title: string
}
export interface IUpdateCategoryResponse extends Omit<Omit<newICategory, 'icon_url'>, 'color_code'> {}


export interface IGetCategoriesByGroupResponse {
    categories_group: newICategory[]
}