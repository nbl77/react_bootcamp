import React, {
	useState
} from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse
} from "mdbreact";

export default function Nav( props ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const toggleCollapse = _ => {
		setIsOpen( !isOpen );
	}
	const userLogin = props.data[ 0 ].filter( item => item.status === "login" )
		.length > 0;
	return (
		<nav>
      <MDBNavbar style={{background:"#F6AB6C"}} dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Student-BIO</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
						{userLogin ? "" : (
							<MDBNavItem>
              <MDBNavLink to="/register">Register</MDBNavLink>
            </MDBNavItem>)}

          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/logout">Logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </nav>
	);
}
