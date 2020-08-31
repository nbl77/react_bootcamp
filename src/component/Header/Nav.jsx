import React,{
	useState,
	useContext,
	createContext
} from 'react';
import {
	Link
} from 'react-router-dom';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBContainer
} from 'mdbreact';

const NavContext = createContext();

function Nav() {
	const[nav,setNav] = useState('home');
	const login = JSON.parse(localStorage.login);
	const [collapse,setCollapse] = useState(false);
	const onClick = ()=> {
		setCollapse(!collapse);
	}
	const bgBlue = {backgroundColor: '#37A5E8'}
	return (
		<NavContext.Provider value={[nav,setNav]}>
			<MDBNavbar style={bgBlue} dark expand="md" scrolling fixed="top">
				<MDBContainer>
					<MDBNavbarBrand href="/">
						<strong>Management Karyawan</strong>
					</MDBNavbarBrand>
					<MDBNavbarToggler onClick={ onClick } />
					<MDBCollapse isOpen = { collapse } navbar>
						<MDBNavbarNav left>
							{login.type === "hrd" ? <HRDNav /> : <KaryawanNav id={login.id} />}
						</MDBNavbarNav>
						<MDBNavbarNav right>
							<MDBNavItem>
								<MDBNavLink to="/logout">Logout</MDBNavLink>
							</MDBNavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBContainer>
			</MDBNavbar>
		</NavContext.Provider>
	)
}
function HRDNav({match}) {
	const[nav,setNav] = useContext(NavContext);
	return (
		<>
		<MDBNavItem>
			<MDBNavLink to="/">Home</MDBNavLink>
		</MDBNavItem>
		<MDBNavItem>
			<MDBNavLink to="/input_karyawan">Input Karyawan</MDBNavLink>
		</MDBNavItem>
		<MDBNavItem>
			<MDBNavLink to="/list_karyawan">List Karyawan</MDBNavLink>
		</MDBNavItem>
		<MDBNavItem>
			<MDBNavLink to="/input_divisi">Input Divisi</MDBNavLink>
		</MDBNavItem>
		<MDBNavItem>
			<MDBNavLink to="/list_divisi">List Divisi</MDBNavLink>
		</MDBNavItem>
		<MDBNavItem>
			<MDBNavLink to="/penempatan_divisi">Penempatan Divisi</MDBNavLink>
		</MDBNavItem>
		</>
	)
}
function KaryawanNav(props) {
	return(
		<>

		<MDBNavItem active>
			<MDBNavLink to={`/single/${props.id}`}>Home</MDBNavLink>
		</MDBNavItem>
		</>
	)
}

export default Nav;
