export interface AverageRates {
    dateTime: Date,
    all: number,
    flatbedRate: number,
    reeferRate: number,
    vanRate: number
}

export interface EquipmentProfitability {
    all: number,
    flatbed: number,
    reefer: number,
    van: number
}

export interface LoadsByStatus {
    all: number,
    allLoadsMileage: number,
    allLoadsGross: number,
    allLoadsCosts: number,
    savedLoads: number,
    savedLoadsMileage: number,
    savedLoadsGross: number,
    savedLoadsCosts: number,
    bookedLoads: number,
    bookedLoadsMileage: number,
    bookedLoadsGross: number,
    bookedLoadsCosts: number,
    inProgressLoads: number,
    inProgressLoadsMileage: number,
    inProgressLoadsGross: number,
    inProgressLoadsCosts: number,
    completedLoads: number,
    completedLoadsMileage: number,
    completedLoadsGross: number,
    completedLoadsCosts: number,
    payedLoads: number,
    payedLoadsMileage: number,
    payedLoadsGross: number,
    payedLoadsCosts: number
}

export interface TrucksByStatus {
    all: number,
    trucksOnRoad: number,
    trucksPending: number,
    trucksRepair: number
}

export interface WeekResults {
    startDate: Date,
    finishDate: Date,
    totalMiles: number,
    milesPerTruck: number,
    totalRate: number,
    averageRate: number,
    totalProfit: number,
    totalCosts: number
}

export interface LoadsByStatusCardProps {
    loadsByStatus: LoadsByStatus
}

export interface EquipmentProfitabilityCardProps {
    equipmentProfotability: EquipmentProfitability
}