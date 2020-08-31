import React from 'react';
import {Redirect,Link} from 'react-router-dom';

export default function HRD() {
	let status = false;
	const login = localStorage.login;
	if (login) {
		status = true;
	}
	return(
	<div>
		{status ? null : <Redirect to='/login' />}
		Selamat Datang Di Halaman HRD
		<br/>
		<Link to='/logout'>Logout</Link>
	</div>
	)
}
