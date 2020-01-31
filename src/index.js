import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // for support routing
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import './assets/css/toastr.min.css';

import { createStore, combineReducers } from 'redux';
import loginReducer from './store/reducers/login-reducer';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  loginReducer: loginReducer
});

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
