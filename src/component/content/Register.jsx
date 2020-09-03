import React, {
	useState,
	useEffect
} from 'react';
import {
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBInput,
	MDBBtn
} from 'mdbreact';
import Form from './additional/Form';

function Register( props ) {
	const [ data, setData ] = props.data;
	const [ nama, setNama ] = useState();
	const [ quotes, setQuotes ] = useState();
	const [ profile, setProfile ] = useState();
	const [ email, setEmail ] = useState();
	const [ gitHub, setGithub ] = useState();
	const handleSubmit = e => {
		e.preventDefault();
		const dataStudent = {
			id: parseInt( Date.now() ),
			nama: nama,
			quotes: quotes,
			profile: profile,
			email: email,
			github: gitHub
		}
		if ( !nama ) {
			alert( "Nama Tidak Boleh Kosong" );
		} else if ( !quotes ) {
			alert( "Quotes tidak boleh kosong" );
		} else if ( !profile ) {
			alert( "Profile picture tidak boleh kosong" );
		} else if ( !email ) {
			alert( "Email tidak boleh kosong" );
		} else if ( !gitHub ) {
			alert( "Github tidak boleh kosong" );
		} else {
			setData( [ ...data, dataStudent ] );
			setNama( "" );
			setQuotes( "" );
			setProfile( "" );
			setEmail( "" );
			setGithub( "" );
			alert( "Berhasil Menambahkan data" );
		}
	}
	return (
		<div>
			<Form type="register" data={[ data, setData ]} nama={[ nama, setNama ]} quotes={[ quotes, setQuotes ]} profile={[ profile, setProfile ]} email={[ email, setEmail ]} github={[ gitHub, setGithub ]} handleSubmit={handleSubmit} />
		</div>
	);
}
export default Register;
