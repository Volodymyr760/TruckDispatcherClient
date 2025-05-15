import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth'
import { brokerLoadReducer } from './reducers/brokerLoad'
import { cityReducer } from './reducers/city'
import { clientReducer } from './reducers/client'
import { driverReducer } from './reducers/driver'
import { importLoadReducer } from './reducers/importload'
import { invoiceReducer } from './reducers/invoice'
import { loadReducer } from './reducers/load'
import { notificationReducer } from './reducers/notification'
import { brokerReducer } from './reducers/broker'
import { pricepackageReducer } from './reducers/pricepackage'
import { truckReducer } from './reducers/truck'
import { userReducer } from './reducers/user'

export const rootReducer = combineReducers({
    auth: authReducer,
    brokerLoad: brokerLoadReducer,
    city: cityReducer,
    client: clientReducer,
    driver: driverReducer,
    importLoad: importLoadReducer,
    invoice: invoiceReducer,
    load: loadReducer,
    notification: notificationReducer,
    broker: brokerReducer,
    pricepackage: pricepackageReducer,
    truck: truckReducer,
    user: userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
