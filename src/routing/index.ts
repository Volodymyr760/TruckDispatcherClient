export interface IRoute {
    path: string
    component: JSX.Element
    title: string
}

export enum RouteNames {
    ADMIN_CLIENTS = "/admin/clients",
    ADMIN_INVOICES = "/admin/invoices",
    ADMIN_LOADS = "/admin/loads",
    ADMIN_BROKER = '/admin//brokers',
    ADMIN_REMINDERS = '/admin/reminders',
    ADMIN_USERS = '/admin/users',
    CHANGE_EMAIL = '/change-email',
    CHANGE_PASSWORD = '/change-password',
    DASHBOARD = '/dashboard',
    DRIVER = '/driver',
    EMAIL_CONFIRM = '/email-confirm',
    ERROR = '/error',
    FEATURES = '/features',
    FORGOT_PASSWORD = '/forgot-password',
    HELP = '/help',
    HOME = "/",
    INVOICES = "/invoices",
    INVOICE = "/invoices/:id",
    LOAD = '/load',
    LOGIN = '/login',
    PRIVACY_POLICY = "/privacy",
    PRICES = "/prices",
    PROFILE = "/profile",
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    RESET_PASSWORD = '/reset-password',
    SEARCH = '/search',
    TERMS_CONDITIONS = "/terms",
    TEST_UI = '/test',
    TRUCK = '/truck',
    BROKER_LOADS = '/brokerloads',
    HEATMAP = '/heatmap'
}
