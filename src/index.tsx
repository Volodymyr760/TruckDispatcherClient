import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupStore } from "./store"
import { AxiosMiddleware } from './api/middleware'
import './index.css'

const store = setupStore()

AxiosMiddleware.boot()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals()
