import { OrderType } from "./orderType"

export interface ISearchParams<T> {
    pageSize: number,
    currentPage: number,
    searchCriteria: string,
    userId: string
    sortField: string,
    order: OrderType,
    includeNavProperties: boolean,
    itemList: T[],
    pageCount: number,
    totalItemsCount: number,
}
