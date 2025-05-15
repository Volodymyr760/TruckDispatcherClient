import axios from 'axios'
import { CreateInvoiceDto, IInvoice } from '../types/invoice'
import { IPatchDocumentItem } from '../types/common/patchDocument'
import { ISearchParams } from '../types/common/searchParams'

/**
 * Get list of Invoices
 * @param invoicesSearchParams<ISearchParams<IInvoice>>> Invoices SearchParams
 */
export async function searchInvoicesAxios(invoicesSearchParams: ISearchParams<IInvoice>): Promise<ISearchParams<IInvoice>> {
    return (await axios.post(`/invoice/search`, invoicesSearchParams)).data
}

/**
 * Get list of Invoices without filtering by userId (Admin area)
 * @param invoicesSearchParams<ISearchParams<IInvoice>>> Invoices SearchParams
 */
export async function getAllInvoicesAxios(invoicesSearchParams: ISearchParams<IInvoice>): Promise<ISearchParams<IInvoice>> {
    return (await axios.post(`/invoice/getAll`, invoicesSearchParams)).data
}

/**
 * Get Invoice specified by identifier
 * @param id<string> Invoice identifier
 */
export async function getInvoiceByIdAxios(id: string): Promise<IInvoice> {
    return (await axios.get(`/invoice/get/${id.toString()}`)).data
}

/**
 * Creates a new Invoice
 * @param createInvoiceDto<CreateInvoiceDto> object of type CreateInvoiceDto
 * @returns<IInvoice> Created Invoice
 */
export async function createInvoiceAxios(createInvoiceDto: CreateInvoiceDto): Promise<IInvoice> {
    return (await axios.post("/invoice/create", createInvoiceDto)).data
}

/**
 * Updates the existing Invoice
 * @param invoice<IInvoice> Object of type IInvoice
 * @returns<IInvoice> Updated Invoice object
 */
export async function updateInvoiceAxios(invoice: IInvoice): Promise<IInvoice> {
    return (await axios.put("/invoice/update", invoice)).data
}

/**
 * @param id<string> Invoice identifier
 * @param patchDocument<IPatchDocument> Patch document to update Invoice field
 * @returns<IInvoice> Updated Invoice object
 */
export async function partialUpdateInvoiceAxios(id: string, patchDocument: IPatchDocumentItem): Promise<IInvoice> {
    return (await axios.patch(`/invoice/partialupdate/${id}`, [patchDocument])).data
}

/**
 * Delete's the Invoice specified by identifier
 * @param id<string> Identifier
 */
export async function removeInvoiceAxios(id: string): Promise<void> {
    return await axios.delete(`/invoice/delete/${id}`)
}