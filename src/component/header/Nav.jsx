import React from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavItem,
	MDBNavLink,
	MDBContainer,
	MDBIcon
} from 'mdbreact';
import {
	isLoaded,
	isEmpty,
	useFirebaseConnect
} from 'react-redux-firebase'
import {
	useSelector,
	useDispatch
} from 'react-redux';
import firebase from 'firebase/app';

function Nav() {
	const dispatch = useDispatch();
	useFirebaseConnect( [ {
		path: "movie"
	} ] )
	const [ collapse, setCollapse ] = React.useState( false );
	const isWideEnough = React.useState( false )[ 0 ];
	const auth = useSelector( state => state.firebase.auth )
	const movie = useSelector( state => state.firebase.ordered.movie )
	const TypeLogged = useSelector( state => state.typeLogged )
	const setTypeLogged = useSelector( state => state.dispatch )
	const [ isLogged, setIsLogged ] = React.useState( false );

	function onClick() {
		setCollapse( !collapse );
	}
	if ( isLoaded( auth ) && !isEmpty( auth ) && !isLogged ) {
		if ( TypeLogged === "" ) {
			if ( auth.email === "admin@gmail.com" && TypeLogged !== "admin" ) {
				dispatch( {
					type: "setTypeLogged",
					payload: "admin"
				} );
			} else {
				dispatch( {
					type: "setTypeLogged",
					payload: "user"
				} );
			}
		}
		setIsLogged( true )
	}
	return (
		<nav>
      <MDBNavbar className="z-depth-0" color="bg-dark" fixed="top" dark expand="md" scrolling transparent>
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong>Ti<MDBIcon fab icon="xing" className="color-second" />-Bioskop<MDBIcon icon="feather-alt" /></strong>
          </MDBNavbarBrand>
          {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav right className="align-items-center">
              <MDBNavItem active>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/list">Movies</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/bioskop">Bioskop</MDBNavLink>
              </MDBNavItem>
							{TypeLogged === "user" ? (
								<MDBNavItem>
									<MDBNavLink to="/ticket">Ticket</MDBNavLink>
								</MDBNavItem>
							) : null}
							{isLogged ? (
								<MDBNavItem>
	                <MDBNavLink className="mr-0 sign" to="/logout">Logout</MDBNavLink>
	              </MDBNavItem>
							) : (
								<>
								<MDBNavItem>
									<MDBNavLink className="mr-0 sign" to="/register">Sign Up</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem>
									<MDBNavLink className="mr-1 sign-in border border-light rounded-pill px-3 ml-md-3 d-inline-block" to="/login">Sign In</MDBNavLink>
								</MDBNavItem>
								</>
							)}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </nav>
	);
}

export default Nav;
