import React from 'react';
import ReactDOM from 'react-dom';
import './admin/app-assets/css/vendors.css';
import './admin/app-assets/css/app.css';
import './admin/app-assets/css/core/menu/menu-types/vertical-menu-modern.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
// import './admin/app-assets/fonts/line-awesome/css/line-awesome-font-awesome.css';
// import './admin/app-assets/fonts/simple-line-icons/style.css';
import './admin/assets/css/style.css';
import './admin/assets/css/hamburgers.min.css';
import './admin/assets/css/backup-cash-style.css';
import './admin/assets/css/responsiveness.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from "./AppRouter/AppRouter";
import {ToastProvider} from "react-toast-notifications";
import {amountInput} from "./Helpers/Helper";


ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
