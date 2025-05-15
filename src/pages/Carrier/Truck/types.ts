import { IDriver } from "../../../types/driver"
import { ILoad } from "../../../types/load"
import { ITruck, TruckDto } from "../../../types/truck"

export interface TruckFiltersProps {
    onAddNew: () => void
}

export interface TruckCardProps {
    truck: ITruck
    onEdit: (truck: ITruck) => void
}

export interface TruckFormProps {
    truck: ITruck
    onClose: () => void
}

export interface TruckDriverFormCardProps {
    driver: IDriver
}

export interface TruckLoadFormCardProps {
    load: ILoad
    onDelete: (load: ILoad) => void
}
