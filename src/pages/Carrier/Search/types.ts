import { IImportLoad } from "../../../types/importload"
import { Role } from "../../../types/auth"
import { TruckDto } from "../../../types/truck"

export interface SearchPageProps {
    role: Role
}

export interface SearchCardProps {
    importLoad: IImportLoad
    isBackhaul: boolean
}

export interface BackhaulsProps {
    importLoad: IImportLoad
    truck: TruckDto
    isToAnywhere: boolean
    onClose: () => void
}

export const brokerTrucks = [
    {
        "id": "1",
        "name": "Van",
        "licensePlate": "Truck",
        "equipment": 3,
        "costPerMile": 0.01,
        "avatar": "",
        "drivers": [],
        "loads": [],
        "userId": "1",
        "truckStatus": 1,
        "notes": ""
    },
    {
        "id": "2",
        "name": "Flatbed",
        "licensePlate": "Truck",
        "equipment": 1,
        "costPerMile": 0.01,
        "avatar": "",
        "drivers": [],
        "loads": [],
        "userId": "1",
        "truckStatus": 1,
        "notes": ""
    },
    {
        "id": "3",
        "name": "Reefer",
        "licensePlate": "Truck",
        "equipment": 2,
        "costPerMile": 0.01,
        "avatar": "",
        "drivers": [],
        "loads": [],
        "userId": "1",
        "truckStatus": 1,
        "notes": ""
    }
]