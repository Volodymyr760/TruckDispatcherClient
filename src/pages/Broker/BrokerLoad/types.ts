import { IImportLoad } from "../../../types/importload"

export interface BrokerLoadCardProps {
    load: IImportLoad
    onEdit: (load: IImportLoad) => void
}

export interface BrokerLoadFormProps {
    load: IImportLoad
    closeForm: () => void
}