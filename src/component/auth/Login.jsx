import React, {
	useState,
	useRef
} from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBRow,
	MDBInput,
	MDBBtn,
	MDBContainer,
	MDBCardTitle
} from 'mdbreact';

import {
	Redirect
} from 'react-router-dom';

export default function Login( props ) {
	const [ username, setUsername ] = useState( false );
	const [ password, setPassword ] = useState( false );
	const ref = useRef( null );
	const handleChange = e => {
		switch ( e.target.name ) {
		case "username":
			setUsername( e.target.value );
			break;
		case "password":
			setPassword( e.target.value );
			break;
		}
	}
	const handleSubmit = e => {
		e.preventDefault();
		if ( !username || !password ) {
			alert( "Password atau username tidak boleh kosong" );
		} else {
			if ( username.toLowerCase() === "admin" && password.toLowerCase() === "admin" ) {
				props.setIsLogin( true );
			} else {
				const res = props.data[ 0 ].map( item => {
						if ( item.email === username && item.email === password ) {
							item.status = "login";
						}
						return item;
					} )
					.some( item => item.email === username && item.email === password )
				if ( res ) {
					props.setIsLogin( true );
				} else {
					alert( "Username atau Password yang anda masukan salah" );
				}
			}
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			{props.isLogin ? <Redirect to="/" /> : null}
			<MDBContainer className="mt-5">
	      <MDBRow className="justify-content-md-center">
	        <MDBCol md="5">
	          <MDBCard>
	            <MDBCardImage className="img-fluid" style={{height:"250px"}} width="100%" src="./login-img.svg" />
							<MDBCardBody>
								<MDBCardTitle className="title-login">Student BIO</MDBCardTitle>
								<MDBInput label="Username" type="text" name="username" autoComplete="off" onChange={handleChange} />
								<MDBInput label="Password" type="password" name="password" autoComplete="off" onChange={handleChange} />
								<MDBBtn type="submit" className="btn-yellow">
									Login
								</MDBBtn>
							</MDBCardBody>
	          </MDBCard>
	        </MDBCol>
	      </MDBRow>
			</MDBContainer>
    </form>
	);
}
