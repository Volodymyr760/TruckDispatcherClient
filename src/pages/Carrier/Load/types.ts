import { ILoad } from "../../../types/load"

export interface LoadFiltersProps {
    onAddNew: () => void
}

export interface LoadCardProps {
    load: ILoad
    onEdit: (load: ILoad) => void
}

export interface LoadFormProps {
    load: ILoad
    closeForm: () => void
}