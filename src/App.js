import React, {
	useState,
	useEffect
} from 'react';
import Header, {
	Nav
} from './component/header';
import ContentMain from './component/content';
import {
	Login
} from './component/auth';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import {
	connect,
	useSelector,
	useDispatch
} from 'react-redux';
import app from 'firebase/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./assets/css/style.css";

function App( props ) {
	const [ isLogin, setIsLogin ] = [ props.isLogin, props.setLogin ];
	const db = app.database();
	const student = db.ref( 'students' );

	let storage = [];
	const data = useSelector( state => state.Student );
	const dispatch = useDispatch();

	const setData = ( type, dataPayload ) => {
		dispatch( {
			type: type,
			payload: dataPayload
		} );
	}
	const showError = err => {
		console.log( err );
	}

	if (data.length < 1) {
		student.once( "value", dataStudent => {
			if ( dataStudent.val()
			.length !== null ) {
				dispatch({
					type: "setStudent",
					payload: dataStudent.val()
				})
			}
		}, showError );
	}

	student.on( "child_changed", dataStudent => {
		const newData = data.map(item=>{
			if (item.id === dataStudent.id) {
				return dataStudent;
			}
			return item;
		})
		dispatch({
			type: "setStudent",
			payload: newData
		})
	}, null );
	useEffect( () => {
		console.log(data);
		if ( data.some( item => item.status === "login" ) && !isLogin ) {
			setIsLogin( true )
		}
		localStorage.setItem( "data", JSON.stringify( data ) )
	} )
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/login">
						<Login isLogin={isLogin} setIsLogin={setIsLogin} data={[data,setData]} />
					</Route>
					<Route path="/">
						<Header data={[data,setData]} isLogin={[ isLogin, setIsLogin ]}>
							<Nav data={[data,setData]} />
							<ContentMain login={[ isLogin, setIsLogin ]} data={[ data, setData ]}/>
						</Header>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

const stateToProps = ( state ) => ( {
	isLogin: state.Logged
} )
const dispatchToProps = dispatch => ( {
	setLogin: status => dispatch( {
		type: status
	} ),
	addInit: payload => dispatch( {
		type: "setStudent",
		payload: payload
	} )
} )
export default connect( stateToProps, dispatchToProps )( App );
