import React from 'react';

import Login from './Login';
import Register from './Register';
import firebase from 'firebase/app';
import {
	useSelector,
	useDispatch
} from 'react-redux';
import {
	isEmpty
} from 'react-redux-firebase'
import {
	Redirect
} from 'react-router-dom';

function Logout() {
	const auth = useSelector( state => state.firebase.auth )
	const dispatch = useDispatch();
	const lg = firebase.logout()
	if ( isEmpty( auth ) ) {
		dispatch( {
			type: "logout"
		} )
		return <Redirect to="/login" />;
	}
	return ( < > < /> )
	}
	export {
		Login,
		Register,
		Logout
	}
