import * as AuthActionCreators from "./auth"
import * as BrokerLoadActionCreators from "./brokerLoad"
import * as CityActionCreators from "./city"
import * as ClientActionCreators from "./client"
import * as DriverActionCreators from "./driver"
import * as ImportLoadActionCreators from "./importload"
import * as InvoiceActionCreators from "./invoice"
import * as LoadActionCreators from "./load"
import * as NotificationActionCreators from "./notification"
import * as BrokerActionCreators from "./broker"
import * as PripackageActionCreators from "./pricepackage"
import * as TruckActionCreators from "./truck"
import * as UserActionCreators from "./user"

export const ActionCreators = {
    ...AuthActionCreators,
    ...BrokerLoadActionCreators,
    ...CityActionCreators,
    ...ClientActionCreators,
    ...DriverActionCreators,
    ...ImportLoadActionCreators,
    ...InvoiceActionCreators,
    ...LoadActionCreators,
    ...NotificationActionCreators,
    ...BrokerActionCreators,
    ...PripackageActionCreators,
    ...TruckActionCreators,
    ...UserActionCreators,
}