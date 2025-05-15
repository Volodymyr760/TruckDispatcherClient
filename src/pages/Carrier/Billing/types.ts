import { IInvoice } from "../../../types/invoice"
import { IPricepackage } from "../../../types/pricepackage"

export interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export interface BillingTabPageProps {
    onCreate: (pricepackage: IPricepackage) => void
}

export interface PriceCardProps {
    pricepackage: IPricepackage;
    onOrder: (pricepackage: IPricepackage) => void
}

export interface InvoiceFormProps {
    pricepackage: IPricepackage
    onClose: () => void
}

export interface InvoiceCardProps {
    invoice: IInvoice
}