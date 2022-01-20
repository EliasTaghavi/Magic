import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker, {unregister as unregisterServiceWorker} from './registerServiceWorker';
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from 'react-toastify';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <BrowserRouter basename={baseUrl}>
            <App />
            <ToastContainer/>
         </BrowserRouter>
      </PersistGate>
   </Provider>, rootElement);

unregisterServiceWorker();

