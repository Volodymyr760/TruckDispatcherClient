import { OrderType } from "../../types/common/orderType"
import { InvoiceAction, InvoiceActionTypes, InvoiceState, IInvoice } from "../../types/invoice"

const initialState: InvoiceState = {
    invoiceSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "Invoice No",
        order: OrderType.Descending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const invoiceReducer = (state: InvoiceState = initialState, action: InvoiceAction): InvoiceState => {
    switch (action.type) {
        case InvoiceActionTypes.GET_INVOICES:
            return { ...state, invoiceSearchParams: action.payload }
        case InvoiceActionTypes.LOAD_MORE_INVOICES:
            return { ...state, invoiceSearchParams: { ...action.payload,
                    itemList: state.invoiceSearchParams.itemList.concat(action.payload.itemList) } }
        case InvoiceActionTypes.SET_INVOICE_ERROR:
            return { ...state, error: action.payload }
        case InvoiceActionTypes.SET_INVOICE_LOADING:
            return { ...state, loading: action.payload }
        case InvoiceActionTypes.SET_INVOICE_PAGE:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, currentPage: action.payload } }
        case InvoiceActionTypes.SET_INVOICE_SORTFIELD:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, sortField: action.payload } }
        case InvoiceActionTypes.SET_INVOICE_SORT:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, order: action.payload } }
        case InvoiceActionTypes.SET_INVOICE_USERID:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, userId: action.payload } }
        case InvoiceActionTypes.CREATE_INVOICE:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, itemList: [action.payload, ...state.invoiceSearchParams.itemList] } }
        case InvoiceActionTypes.UPDATE_INVOICE:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, itemList: updateInvoice(state, action.payload) } }
        case InvoiceActionTypes.REMOVE_INVOICE:
            return { ...state, invoiceSearchParams: { ...state.invoiceSearchParams, itemList: deleteInvoice(state, action) } }
        default: return state
    }
}

function updateInvoice(state: InvoiceState, invoiceToUpdate: IInvoice): Array<IInvoice> {
    return state.invoiceSearchParams.itemList.map((invoice: IInvoice) => {
        if (invoice.id === invoiceToUpdate.id) return invoiceToUpdate
        return invoice
    })
}

function deleteInvoice(state: InvoiceState, action: InvoiceAction): Array<IInvoice> {
    return state.invoiceSearchParams.itemList.filter(invoice => invoice.id !== action.payload)
}
