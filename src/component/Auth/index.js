import React, {
	useState,
	createContext,
	useEffect
} from 'react';
import {
	LoginForm
} from './Login';
import {
	Redirect
} from 'react-router-dom';
import {
	useSelector,
	useDispatch
} from 'react-redux';

function Logout( props ) {
	const login = useSelector( state => state.logged );
	const dispatch = useDispatch();
	const setLogin = status => dispatch( {
		type: "SIGN",
		data: status
	} )
	if ( login.status ) {
		setLogin( {} );
	}
	return <Redirect to='/login' />
}
export {
	LoginForm,
	Logout
}
