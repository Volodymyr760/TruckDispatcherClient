import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../hooks/ProtectedRoute'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Role } from '../types/auth'
import { RouteNames } from '../routing'
import AdminInvoicesPage from '../pages/Admin/Invoices/AdminInvoicesPage'
import AdminLoadsPage from '../pages/Admin/Loads/AdminLoadsPage'
import AdminBrokerPage from '../pages/Admin/Brokers/AdminBrokerPage'
import AdminUsersPage from '../pages/Admin/Users/UsersPage'
import BrokerLoadPage from '../pages/Broker/BrokerLoad/BrokerLoadPage'
import BillingPage from '../pages/Carrier/Billing/BillingPage'
import ChangeEmailPage from '../pages/Account/ChangeEmail/ChangeEmailPage'
import ChangePasswordPage from '../pages/Account/ChangePassword/ChangePasswordPage'
import ClientPage from '../pages/Admin/Clients/ClientPage'
import Dashboard from '../pages/Carrier/Dashboard/Dashboard'
import DemoLayout from './Layouts/DemoLayout'
import DriverPage from '../pages/Carrier/Driver/DriverPage'
import EmailConfirmPage from '../pages/Account/EmailConfirm/EmailConfirmPage'
import ErrorPage from '../pages/Public/Error/ErrorPage'
import FeaturesPage from '../pages/Public/Features/FeaturesPage'
import ForgotPasswordPage from '../pages/Account/ForgotPassword/ForgotPasswordPage'
import HeatmapPage from '../pages/HeatMap/HeatmapPage'
import HelpPage from '../pages/Public/Help/HelpPage'
import HomePage from '../pages/Public/Home/HomePage'
import InvoicePreview from '../pages/Carrier/Billing/InvoicePreview'
import LoadPage from '../pages/Carrier/Load/LoadPage'
import LoginPage from '../pages/Account/Login/LoginPage'
import PricePage from '../pages/Public/Prices/PricePage'
import PrivacyPolicyPage from '../pages/Public/PrivacyPolicy/PrivacyPolicyPage'
import ProfilePage from '../pages/Account/Profile/ProfilePage'
import PublicLayout from './Layouts/PublicLayout'
import RegisterCompletePage from '../pages/Account/RegisterComplete/RegisterCompletePage'
import RegisterPage from '../pages/Account/Register/RegisterPage'
import ResetPasswordPage from '../pages/Account/ResetPassword/ResetPasswordPage'
import SearchPage from '../pages/Carrier/Search/SearchPage'
import TermsConditionsPage from '../pages/Public/TermsConditions/TermsConditionsPage'
import TestUI from '../pages/Test/TestUI'
import TruckPage from '../pages/Carrier/Truck/TruckPage'

export default function AppRouter() {

    const { auth } = useTypedSelector(state => state.auth)

    const publicPages = [
        { route: RouteNames.EMAIL_CONFIRM, element: <PublicLayout><EmailConfirmPage /></PublicLayout> },
        { route: RouteNames.FEATURES, element: <PublicLayout><FeaturesPage /></PublicLayout> },
        { route: RouteNames.FORGOT_PASSWORD, element: <PublicLayout><ForgotPasswordPage /></PublicLayout> },
        { route: RouteNames.HOME, element: <PublicLayout ><HomePage /></PublicLayout> },
        { route: RouteNames.HELP, element: <PublicLayout ><HelpPage /></PublicLayout> },
        { route: RouteNames.TEST_UI, element: <PublicLayout ><TestUI /></PublicLayout> },
        { route: RouteNames.LOGIN, element: <PublicLayout ><LoginPage /></PublicLayout> },
        { route: RouteNames.PRIVACY_POLICY, element: <PublicLayout ><PrivacyPolicyPage /></PublicLayout> },
        { route: RouteNames.PRICES, element: <PublicLayout ><PricePage /></PublicLayout> },
        { route: RouteNames.REGISTER, element: <PublicLayout ><RegisterPage /></PublicLayout> },
        { route: RouteNames.REGISTER_COMPLETE, element: <PublicLayout ><RegisterCompletePage /></PublicLayout> },
        { route: RouteNames.RESET_PASSWORD, element: <PublicLayout><ResetPasswordPage /></PublicLayout> },
        { route: RouteNames.TERMS_CONDITIONS, element: <PublicLayout ><TermsConditionsPage /></PublicLayout> },
        { route: "*", element: <PublicLayout ><ErrorPage /></PublicLayout> },
    ]

    const adminPages = [
        { route: RouteNames.ADMIN_CLIENTS, element: <DemoLayout title='Clients'><ClientPage /></DemoLayout> },
        { route: RouteNames.ADMIN_INVOICES, element: <DemoLayout title='Invoices'><AdminInvoicesPage /></DemoLayout> },
        { route: RouteNames.ADMIN_LOADS, element: <DemoLayout title='Loads'><AdminLoadsPage /></DemoLayout> },
        { route: RouteNames.ADMIN_BROKER, element: <DemoLayout title='Brokers'><AdminBrokerPage /></DemoLayout> },
        { route: RouteNames.ADMIN_USERS, element: <DemoLayout title='Users'><AdminUsersPage /></DemoLayout> }
    ]
    
    const carrierPages = [
        { route: RouteNames.CHANGE_EMAIL, element: <DemoLayout title='Change Email'><ChangeEmailPage /></DemoLayout> },
        { route: RouteNames.CHANGE_PASSWORD, element: <DemoLayout title='Change Password'><ChangePasswordPage /></DemoLayout> },
        { route: RouteNames.DASHBOARD, element: <DemoLayout title='Dashboard'><Dashboard /></DemoLayout> },
        { route: RouteNames.DRIVER, element: <DemoLayout title='Drivers' ><DriverPage /></DemoLayout> },
        { route: RouteNames.HEATMAP, element: <DemoLayout title='Heatmap'><HeatmapPage /></DemoLayout> },
        { route: RouteNames.INVOICES, element: <DemoLayout title='Billing'><BillingPage /></DemoLayout> },
        { route: RouteNames.INVOICE, element: <DemoLayout title='Billing'><InvoicePreview /></DemoLayout> },
        { route: RouteNames.LOAD, element: <DemoLayout title='Loads'><LoadPage /></DemoLayout> },
        { route: RouteNames.PROFILE, element: <DemoLayout title='Profile'><ProfilePage /></DemoLayout> },
        { route: RouteNames.SEARCH, element: <DemoLayout title='Search'><SearchPage role={Role.Carrier} /></DemoLayout> },
        { route: RouteNames.TRUCK, element: <DemoLayout title='Trucks'><TruckPage /></DemoLayout> }
    ]

    const brokerPages = [
        { route: RouteNames.CHANGE_EMAIL, element: <DemoLayout title='Change Email'><ChangeEmailPage /></DemoLayout> },
        { route: RouteNames.CHANGE_PASSWORD, element: <DemoLayout title='Change Password'><ChangePasswordPage /></DemoLayout> },
        { route: RouteNames.HEATMAP, element: <DemoLayout title='Heatmap'><HeatmapPage /></DemoLayout> },
        { route: RouteNames.INVOICES, element: <DemoLayout title='Billing'><BillingPage /></DemoLayout> },
        { route: RouteNames.INVOICE, element: <DemoLayout title='Billing'><InvoicePreview /></DemoLayout> },
        { route: RouteNames.BROKER_LOADS, element: <DemoLayout title='Loads'><BrokerLoadPage /></DemoLayout> },
        { route: RouteNames.PROFILE, element: <DemoLayout title='Profile'><ProfilePage /></DemoLayout> },
        { route: RouteNames.SEARCH, element: <DemoLayout title='Search'><SearchPage role={Role.Broker} /></DemoLayout> },
    ]

    function authenticatedPages():{route: RouteNames, element: JSX.Element}[] {

        let pages: {route: RouteNames, element: JSX.Element}[] = []

        if (auth) {
            if (auth.roles.includes(Role.Admin)) pages = pages.concat(adminPages)
            if (auth.roles.includes(Role.Carrier)) pages = pages.concat(carrierPages)
            if (auth.roles.includes(Role.Broker)) pages = pages.concat(brokerPages)
        }

        return pages
    }

    return (
        <Routes>
            {publicPages.map(page => <Route key={page.route} path={page.route} element={page.element} />)},
            {
                authenticatedPages().map(page => {
                    return <Route key={page.route} path={page.route} element={<ProtectedRoute>{page.element}</ProtectedRoute>}/>
                })
            }
        </Routes >
    )
}