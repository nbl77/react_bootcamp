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

function Logout(props) {
	const [login,setLogin] = props.login;
	if (login.status) {
		setLogin({});
	}
	return <Redirect to='/login' />
}
export {
	LoginForm,
	Logout
}
