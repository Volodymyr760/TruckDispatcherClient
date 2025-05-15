import { IClient } from "../../../types/client"

export interface ClientCardProps {
    client: IClient
    onEdit: (client: IClient) => void
}

export interface ClientFormProps {
    client: IClient
    closeForm: () => void
}