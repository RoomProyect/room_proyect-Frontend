import ReactDOM from 'react-dom/client'
import axios from 'axios'
import {HashRouter} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'

axios.defaults.baseURL = 'https://room-project-backend.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    )
    