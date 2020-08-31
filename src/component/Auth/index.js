import React, {
	useState,
	createContext,
	useContext,
	useEffect
} from 'react';
import {
	Form,
	Input,
	Button,
	Select
} from './../Form';
import {
	LoginForm
} from './Login';
import {
	Redirect,
	Route,
	Switch
} from 'react-router-dom';

const AuthContext = createContext();
function AuthProvide(props) {
	const [status,setStatus] = useState(false);
	useEffect(()=>{
		const login = localStorage.login;
		if (login) {
			setStatus(true);
		}
	})
	return(
		<AuthContext.Provider value={[status,setStatus]}>
			{props.children}
		</AuthContext.Provider>
	)
}

function Logout() {
	const [status,setStatus] = useContext(AuthContext);
	useEffect(()=>{
		const login = localStorage.login;
		if (login) {
			setStatus(false);
			localStorage.removeItem("login")
		}
	})
	return <Redirect to='/login' />
}
export {
	LoginForm,
	Logout,
	AuthContext,
	AuthProvide
}
