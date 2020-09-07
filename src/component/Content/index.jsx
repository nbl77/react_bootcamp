import React from 'react';

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
import {
	useSelector
} from 'react-redux';

function Content( props ) {
	const login = useSelector( state => state.logged );
	return (
		<>
			<MDBContainer className="text-center mt-5 pt-5">
				{login.type === "karyawan" ? <KaryawanView karyawan={props.karyawan} divisi={props.divisi} penempatan={props.penempatan} login={props.login} /> : <HRDview karyawan={props.karyawan} divisi={props.divisi} penempatan={props.penempatan} />}
				<Route path='/login' >
					<Redirect to='/' />
				</Route>
      </MDBContainer> <
		/>
	);

}

function NoMatch() {
	return (
		<h1>not foound</h1>
	)
}

function KaryawanView( props ) {
	const login = useSelector( state => state.logged );
	return (
		<Switch>
			<Route path='/single/:id' exact >
				<SingleCV karyawan={props.karyawan} divisi={props.divisi} penempatan={props.penempatan} />
			</Route>
			<Route path='/' exact>
				<Redirect to={`/single/${login.id}`} />
			</Route>
			<Route component={NoMatch} />
		</Switch>
	)
}

function HRDview( props ) {
	return (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/input_karyawan' exact >
				<InputKaryawan karyawan={props.karyawan}/>
			</Route>
			<Route path='/input_divisi' exact>
				<InputDivisi divisi={props.divisi} />
			</Route>
			<Route path='/list_karyawan' exact>
				<ListKaryawan karyawan={props.karyawan} />
			</Route>
			<Route path='/list_divisi' exact>
				<ListDivisi divisi={props.divisi} />
			</Route>
			<Route path='/penempatan_divisi'exact>
				<PenempatanDiv penempatan={props.penempatan} karyawan={props.karyawan} divisi={props.divisi}  />
			</Route>
			<Route path='/list_cv' exact component={ListCV} />
			<Route path='/single/:id' exact>
				<SingleCV penempatan={props.penempatan} karyawan={props.karyawan} divisi={props.divisi} />
			</Route>
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
