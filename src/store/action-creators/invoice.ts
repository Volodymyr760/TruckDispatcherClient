import { Dispatch } from "redux"
import { searchInvoicesAxios, getInvoiceByIdAxios, updateInvoiceAxios, getAllInvoicesAxios } from "../../api/invoice"
import { OrderType } from "../../types/common/orderType"
import { IInvoice, InvoiceAction, InvoiceActionTypes } from "../../types/invoice"
import { ISearchParams } from "../../types/common/searchParams"

export const getInvoices = (invoicesSearchParams: ISearchParams<IInvoice>) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.GET_INVOICES, payload:
                    await searchInvoicesAxios(invoicesSearchParams) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error of loading invoices." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const getAllInvoices = (invoicesSearchParams: ISearchParams<IInvoice>) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.GET_INVOICES, payload: await getAllInvoicesAxios(invoicesSearchParams) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error of loading invoices." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const getInvoiceById = (id: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.GET_INVOICE_BY_ID, payload: await getInvoiceByIdAxios(id) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error of loading choosed invoice." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const loadMoreInvoices = (invoicesSearchParams: ISearchParams<IInvoice>) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.LOAD_MORE_INVOICES, payload: await searchInvoicesAxios(invoicesSearchParams) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error of loading invoices." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const loadMoreAllInvoices = (invoicesSearchParams: ISearchParams<IInvoice>) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.LOAD_MORE_INVOICES, payload: await getAllInvoicesAxios(invoicesSearchParams) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error of loading invoices." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const setInvoiceLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: isLoading })
}

export const setInvoiceError = (message: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: message })
}

export const setInvoicePage = (page: number) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_PAGE, payload: page })
}

export const setInvoiceSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_SORTFIELD, payload: sortField })
}

export const setInvoiceSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_SORT, payload: sort })
}

export const setInvoiceUserId = (userId: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.SET_INVOICE_USERID, payload: userId })
}

export const createInvoice = (invoice: IInvoice) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.CREATE_INVOICE, payload: invoice })
}

export const updateInvoice = (invoice: IInvoice) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: true })
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: null })
            dispatch({ type: InvoiceActionTypes.UPDATE_INVOICE, payload: await updateInvoiceAxios(invoice) })
        } catch (error) {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_ERROR, payload: error.message || "Error while updating the invoice." })
        } finally {
            dispatch({ type: InvoiceActionTypes.SET_INVOICE_LOADING, payload: false })
        }
    }
}

export const updateInvoiceIsPaid = (invoice: IInvoice) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.UPDATE_INVOICE, payload: invoice })
}

export const updateInvoiceIsRead = (invoice: IInvoice) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.UPDATE_INVOICE, payload: invoice })
}

export const removeInvoice = (invoice: IInvoice) => {
    return async (dispatch: Dispatch<InvoiceAction>) =>
        dispatch({ type: InvoiceActionTypes.REMOVE_INVOICE, payload: invoice.id })
}