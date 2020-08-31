import React, {
	useState,
	useContext,
	useEffect
} from 'react';

import {
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import InputKaryawan from './InputKaryawan';
import ListKaryawan from './ListKaryawan';
import InputDivisi from './InputDivisi';
import ListDivisi from './ListDivisi';
import PenempatanDiv from './PenempatanDiv';
import ListCV from './ListCv';
import SingleCV from './SingleCV';
import Home from './Home';
import HRD from './HRD';
import {
	MDBContainer
} from 'mdbreact'

function Content() {
	const login  = JSON.parse(localStorage.login);
	return (
		<Switch>
			<MDBContainer className="text-center mt-5 pt-5">
				{login.type === "karyawan" ? <KaryawanView /> : <HRDview />}
				<Route path='/login' >
					<Redirect to='/' />
				</Route>
      </MDBContainer>

		</Switch>
	);

}
function NoMatch() {
	return(
		<h1>not foound</h1>
	)
}
function KaryawanView() {
	const login  = JSON.parse(localStorage.login);
	return(
		<Switch>
			<Route path='/single/:id' exact component={SingleCV} />
			<Route path='/' exact>
				<Redirect to={`/single/${login.id}`} />
			</Route>
			<Route component={NoMatch} />
		</Switch>
	)
}
function HRDview() {
	return(
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/input_karyawan' exact component={InputKaryawan} />
			<Route path='/input_divisi' exact component={InputDivisi} />
			<Route path='/list_karyawan' exact component={ListKaryawan} />
			<Route path='/list_divisi' exact component={ListDivisi} />
			<Route path='/penempatan_divisi' exact component={PenempatanDiv} />
			<Route path='/list_cv' exact component={ListCV} />
			<Route path='/single/:id' exact component={SingleCV} />
			<Route path='/login' exact >
				<Redirect to='/' />
			</Route>
			<Route component={NoMatch} />
		</Switch>
	)
}
export {
	Content,
	HRD
}
