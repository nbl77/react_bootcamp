import React from 'react';
import Home from './Home';
import Register from './Register';
import Edit from './Edit';
import {
	MDBContainer
} from 'mdbreact';
import {
	Redirect,
	Switch,
	Route
} from 'react-router-dom';
import {
	useSelector,
	useDispatch
} from 'react-redux';

function ContentMain( props ) {
	const userLogin = props.data[ 0 ].filter( item => item.status === "login" )
		.length > 0;
	return (
		<section>
			<MDBContainer className="mt-4">
				<Switch>
					<Route path="/" exact >
						<Home data={props.data} />
					</Route>
					<Route path="/home" exact >
						<Home data={props.data} />
					</Route>
					<Route path="/register" exact >
						{userLogin ? <Redirect to='/' /> : <Register data={props.data} />}
					</Route>
					<Route path="/edit/:id" exact >
						<Edit data={props.data} />
					</Route>
					<Route path="/logout" exact>
						<Logout data={props.data} login={props.login} />
					</Route>
				</Switch>
			</MDBContainer>
    </section>
	)
}

function Logout( props ) {
	const isLogin = useSelector( state => state.Logged );
	const dispatch = useDispatch();
	const setIsLogin = status => dispatch( {
		type: status
	} )
	const [ data, setData ] = props.data;
	const newData = data.map( item => {
		if ( item.status === "login" ) {
			item.status = "logout";
		}
		return item;
	} )
	setIsLogin( "LOGOUT" );
	return <Redirect to="/login" />
}

export default ContentMain;
