import { IDriver } from "../../../types/driver"

export interface DriverFiltersProps {
    onAddNew: () => void
}

export interface DriverCardProps {
    driver: IDriver
    onEdit: (driver: IDriver) => void
}

export interface DriverFormProps {
    driver: IDriver
    closeForm: () => void
}
