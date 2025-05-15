import { Navigate, useLocation } from "react-router-dom"
import { useTypedSelector } from './useTypedSelector'

const ProtectedRoute = ({ children }) => {
    const { auth } = useTypedSelector(state => state.auth)
    let location = useLocation()

    if (!auth) return <Navigate to="/login" state={{ from: location }} replace />

    return children

};

export default ProtectedRoute;