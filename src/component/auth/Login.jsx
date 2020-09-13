import React from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBBtn,
	MDBIcon,
	MDBLink
} from 'mdbreact';
import {
	useSelector
} from 'react-redux';
import {
	Redirect
} from 'react-router-dom';
import firebase from 'firebase/app';
import {
	isLoaded,
	isEmpty
} from 'react-redux-firebase'

function Login() {
	const [ email, setEmail ] = React.useState();
	const [ password, setPassword ] = React.useState();
	const auth = useSelector( state => state.firebase.auth )
	const loginAuth = ( credentials ) => {
		return firebase.ref.authWithPassword( credentials )
	}
	const handleSubmit = e => {
		e.preventDefault();
		firebase.login( {
				email,
				password
			} )
			.then( data => {
				alert( "berhasil login" )
			} )
			.catch( err => alert( err.message ) );
	}
	if ( isLoaded( auth ) && !isEmpty( auth ) ) {
		return ( <Redirect to="/home" /> )
	}
	return (
		<div style={{backgroundColor: "#323232"}} className="full-screen d-flex align-items-center">
			<MDBContainer>
				<MDBCard style={{backgroundColor: "#444"}}>
					<MDBCardBody className="rounded-5 z-depth-3 p-5">
						<MDBRow>
							<MDBCol md="5" style={{backgroundColor: "#323232"}} className="z-depth-3 py-5 px-5">
								<h3 className="text-center text-white">Welcome</h3>
									<form onSubmit={handleSubmit}>
										<MDBInput type="email" label="Insert E-Mail" value={email} onChange={e=>setEmail(e.target.value)} />
										<MDBInput type="password" label="Insert Password" value={password} onChange={e=>setPassword(e.target.value)} />
										<MDBBtn className="bg-main" type="submit">Login</MDBBtn>
									</form>
									<span className="d-flex text-white">Belum punya akun ? <MDBLink className="p-0 m-0 pl-2" to="/register">Register</MDBLink></span>
							</MDBCol>
							<MDBCol md="7">
								<h3 className="text-center"><strong style={{color: "#aaa"}}>Ti<MDBIcon fab icon="xing" className="color-second" />-Bioskop<MDBIcon icon="feather-alt" /></strong></h3>
								<span className="p-4 w-75 d-block text-center mx-auto" style={{color: "#aaa"}}>Tix-Bioskop adalah platform penyedia layanan pemesanan tiket secara online</span>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBContainer>
		</div>
	)
}
export default Login;
