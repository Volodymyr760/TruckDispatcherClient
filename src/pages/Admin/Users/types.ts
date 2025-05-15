import { IDriver } from "../../../types/driver"
import { ILoad } from "../../../types/load"
import { ITruck } from "../../../types/truck"
import { IUser } from "../../../types/user"

export interface UserCardProps {
    user: IUser
    onEditAccount: (user: IUser) => void
    onManageUser: (user: IUser) => void
}

export interface AccountFormProps {
    user: IUser
    onClose: () => void
}

export interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export interface AdminDriverCardProps {
    driver: IDriver
    onDelete: (driver: IDriver) => void
}

export interface AdminLoadCardProps {
    load: ILoad
    onDelete: (load: ILoad) => void
}

export interface AdminTruckCardProps {
    truck: ITruck
    onDelete: (truck: ITruck) => void
}
export interface RolesListProps {
    userId: string
}