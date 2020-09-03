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
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./assets/css/style.css";

function App() {
	const [ isLogin, setIsLogin ] = useState( false );
	let storage = [];
	if ( !localStorage.data ) {
		localStorage.setItem( "data", JSON.stringify( [] ) )
	} else {
		storage = JSON.parse( localStorage.data )
	}
	const [ data, setData ] = useState( storage )
	useEffect( () => {
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

export default App;
