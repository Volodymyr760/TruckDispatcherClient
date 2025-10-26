import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupStore } from "./store"
import { AxiosRoutesBoot } from './api/middleware'
import './index.css'

const store = setupStore()

AxiosRoutesBoot()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals()
