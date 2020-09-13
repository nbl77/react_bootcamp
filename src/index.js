import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	Provider
} from 'react-redux';
import {
	ReactReduxFirebaseProvider
} from 'react-redux-firebase';
import {
	store,
	rrfProps
} from './redux';
import 'firebase/database';
import 'firebase/auth';
import firebase from './firebase';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './assets/css/style.css';
ReactDOM.render(
	<React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
	document.getElementById( 'root' )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
