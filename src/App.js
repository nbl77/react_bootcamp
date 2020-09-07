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
import {
	useSelector
} from 'react-redux';
import './assets/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
	const [ karyawan, setKaryawan ] = useState( [] );
	const [ divisi, setDivisi ] = useState( [] );
	const [ login, setLogin ] = useState( {
		status: false
	} );
	const [ isLogin, setIsLogin ] = useState( false );
	const [ penempatan, setPenempatan ] = useState( [] );
	return (
		<div>
			<Router>
				<Switch>
					<Wrap login={[login,setLogin]} karyawan={[karyawan,setKaryawan]} divisi={[divisi,setDivisi]} penempatan={[penempatan,setPenempatan]} />
				</Switch>
			</Router>
		</div>
	)
}

function Wrap( props ) {
	const login = useSelector( state => state.logged );
	if ( login.status ) {
		return (
			<div>
			<Header>
				<Nav login={props.login} />
			</Header>
			<Route path='/logout' >
				<Logout login={props.login} />
			</Route>
			<Content login={props.login} karyawan={props.karyawan} divisi={props.divisi} penempatan={props.penempatan} />
			<Footer />
			</div>
		)
	}
	return <LoginForm login={props.login} karyawan={props.karyawan} />;
}

export default App;
