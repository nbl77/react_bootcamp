import React from 'react';
import {
	Redirect
} from 'react-router-dom';
import Nav from './Nav';

function Header( props ) {
	const [ isLogin, setIsLogin ] = props.isLogin;
	return (
		<header>
			{!isLogin ? <Redirect to="/login" /> : null}
			{props.children}
		</header>
	);
}
export {
	Nav
};
export default Header;
