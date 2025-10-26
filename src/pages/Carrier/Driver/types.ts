import { IDriver } from "../../../types/driver"

export interface DriverCardProps {
    driver: IDriver
    onEdit: (driver: IDriver) => void
}

export interface DriverFormProps {
    driver: IDriver
    closeForm: () => void
}
