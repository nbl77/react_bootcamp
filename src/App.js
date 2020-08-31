import React, {
	useState,
	useEffect,
	useContext
} from 'react';
import {
	Header,
	Nav
} from './component/Header';
import {
	Content,
	HRD
} from './component/Content';
import {
	Footer
} from './component/Footer';
import {
	LoginForm,
	Logout,
	AuthProvide,
	AuthContext
} from './component/Auth';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import './assets/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
	const [status,setStatus] = useState(false);
	useEffect(()=>{
		const login = localStorage.login;
		if (login) {
			setStatus(true);
		}
	})
	return (
		<div>
			<Router>
				<Switch>
					<AuthProvide>
						<Wrap />
					</AuthProvide>
				</Switch>
			</Router>
		</div>
	)
}
function Login() {
	return(
		<>
			<LoginForm />
		</>
	)
}
function Wrap() {
	const [status,setStatus] = useContext(AuthContext);
	return status ? <AuthMenu /> : <Login />;

}

function AuthMenu({match}) {
	return(
		<>
		<Header>
			<Nav />
		</Header>
		<Route path='/logout' component={Logout} />
		<Content />
		<Footer />
		</>
	)
}

export default App;
