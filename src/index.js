import React from 'react';
import ReactDOM from 'react-dom';
import './admin/app-assets/css/vendors.css';
import './admin/app-assets/css/app.css';
import './admin/app-assets/css/core/menu/menu-types/vertical-menu-modern.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './admin/assets/css/style.css';
import './admin/assets/css/hamburgers.min.css';
import './admin/assets/css/backup-cash-style.css';
import './admin/assets/css/responsiveness.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from "./AppRouter/AppRouter";
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';

Sentry.init({ dsn: process.env.REACT_APP_SENTRY });

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <AppRouter />
  </Provider>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
