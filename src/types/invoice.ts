import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"

export interface IInvoice {
    id?: string
    invoiceNo: number
    invoiceTo: string
    item: string // Pricepackage name
    quantity: number
    price: number
    total: number
    beneficiary: string
    account: string
    beneficiaryEmail: string
    bank: string
    bankAddress: string
    swift: string
    intermediaryBank: string
    intermediarySwift: string
    isRead: boolean
    isPaid: boolean
    createdAt: Date
    notes?: string
    userId: string
}

export interface CreateInvoiceDto {
    invoiceTo: string
    item: string
    quantity: number
    price: number
    notes?: string
}

export interface InvoiceState {
    invoiceSearchParams: ISearchParams<IInvoice>
    loading: boolean
    error: null | string
}

export enum InvoiceActionTypes {
    GET_INVOICES = "GET_INVOICES",
    GET_INVOICE_BY_ID = "GET_INVOICE_BY_ID",
    LOAD_MORE_INVOICES = "LOAD_MORE_INVOICES",
    SET_INVOICE_ERROR = "SET_INVOICE_ERROR",
    SET_INVOICE_LOADING = "SET_INVOICE_LOADING",
    SET_INVOICE_PAGE = "SET_INVOICE_PAGE",
    SET_INVOICE_FILTER = "SET_INVOICE_FILTER",
    SET_INVOICE_SORTFIELD = "SET_INVOICE_SORTFIELD",
    SET_INVOICE_SORT = "SET_INVOICE_SORT",
    SET_INVOICE_USERID = "SET_INVOICE_USERID",
    CREATE_INVOICE = "CREATE_INVOICE",
    UPDATE_INVOICE = "UPDATE_INVOICE",
    UPDATE_INVOICE_ISPAID = "UPDATE_INVOICE_ISPAID",
    UPDATE_INVOICE_ISREAD = "UPDATE_INVOICE_ISREAD",
    REMOVE_INVOICE = "REMOVE_INVOICE"
}


interface GetInvoicesAction {
    type: InvoiceActionTypes.GET_INVOICES
    payload: ISearchParams<IInvoice>
}

interface GetInvoiceByIdAction {
    type: InvoiceActionTypes.GET_INVOICE_BY_ID
    payload: IInvoice
}

interface LoadMoreInvoicesAction {
    type: InvoiceActionTypes.LOAD_MORE_INVOICES
    payload: ISearchParams<IInvoice>
}

interface SetInvoiceErrorAction {
    type: InvoiceActionTypes.SET_INVOICE_ERROR
    payload: null | string
}

interface SetInvoiceLoadingAction {
    type: InvoiceActionTypes.SET_INVOICE_LOADING
    payload: boolean
}

interface SetInvoicePageAction {
    type: InvoiceActionTypes.SET_INVOICE_PAGE
    payload: number
}

interface SetInvoiceSortField {
    type: InvoiceActionTypes.SET_INVOICE_SORTFIELD
    payload: string
}

interface SetInvoiceSort {
    type: InvoiceActionTypes.SET_INVOICE_SORT
    payload: OrderType
}

interface SetInvoiceUserId {
    type: InvoiceActionTypes.SET_INVOICE_USERID
    payload: string
}


interface CreateInvoiceAction {
    type: InvoiceActionTypes.CREATE_INVOICE
    payload: IInvoice
}

interface UpdateInvoiceAction {
    type: InvoiceActionTypes.UPDATE_INVOICE
    payload: IInvoice
}

interface UpdateInvoiceIsPaidAction { 
    type: InvoiceActionTypes.UPDATE_INVOICE_ISPAID
    payload: IInvoice
}

interface UpdateInvoiceIsReadAction { 
    type: InvoiceActionTypes.UPDATE_INVOICE_ISREAD
    payload: IInvoice
}

interface RemoveInvoiceAction {
    type: InvoiceActionTypes.REMOVE_INVOICE
    payload: string
}

export type InvoiceAction = GetInvoicesAction |
    GetInvoiceByIdAction |
    LoadMoreInvoicesAction |
    SetInvoiceErrorAction |
    SetInvoiceLoadingAction |
    SetInvoicePageAction |
    SetInvoiceSortField |
    SetInvoiceSort |
    SetInvoiceUserId |
    CreateInvoiceAction |
    UpdateInvoiceAction | UpdateInvoiceIsPaidAction | UpdateInvoiceIsReadAction |
    RemoveInvoiceAction