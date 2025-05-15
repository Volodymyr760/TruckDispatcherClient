import { IBroker } from "../../../types/broker"

export interface BrokerFiltersProps {
    onAddNew: () => void
}

export interface BrokerCardProps {
    broker: IBroker
    onEdit: (Broker: IBroker) => void
}

export interface BrokerFormProps {
    broker: IBroker
    closeForm: () => void
}

