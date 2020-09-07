import React from 'react';
import {
	Redirect,
	Link
} from 'react-router-dom';
import {
	useSelector
} from 'react-redux';
export default function HRD() {
	const login = useSelector( state => state.logged );
	return (
		<div>
		{login.status ? null : <Redirect to='/login' />}
		Selamat Datang Di Halaman HRD
		<br/>
		<Link to='/logout'>Logout</Link>
	</div>
	)
}
