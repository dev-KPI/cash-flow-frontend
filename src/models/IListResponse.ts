export default interface ListResponse<T> {
    total: number
    page: number
    size: number
    pages: number
    items: T[]
}