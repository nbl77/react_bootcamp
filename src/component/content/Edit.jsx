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
import {
	useParams,
	Redirect
} from 'react-router-dom';

function Edit( props ) {
	let id = useParams( "id" )
		.id;
	const [ data, setData ] = props.data;
	const [ status, setStatus ] = useState( false );
	const [ nama, setNama ] = useState();
	const [ quotes, setQuotes ] = useState();
	const [ profile, setProfile ] = useState();
	const [ email, setEmail ] = useState();
	const [ gitHub, setGithub ] = useState();
	const Student = data.filter( item => parseInt( item.id ) === parseInt( id ) )
		.length > 0 ? data.filter( item => parseInt( item.id ) === parseInt( id ) )[ 0 ] : false;
	const handleSubmit = e => {
		e.preventDefault();
		const dataStudent = {
			id: id,
			nama: nama,
			quotes: quotes,
			profile: profile,
			email: email,
			github: gitHub,
			status: Student.status
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
			const mainData = data.map( item => {
				if ( parseInt( item.id ) === parseInt( id ) ) {
					return dataStudent;
				} else {
					return item;
				}
			} )
			console.log( mainData );
			setData( mainData );
			setNama( "" );
			setQuotes( "" );
			setProfile( "" );
			setEmail( "" );
			setGithub( "" );
			setStatus( true );
			alert( "Berhasil Merubah data" );
		}
	}

	useEffect( () => {
		data.map( item => {
			if ( parseInt( item.id ) === parseInt( id ) ) {
				setNama( item.nama );
				setQuotes( item.quotes );
				setProfile( item.profile );
				setEmail( item.email );
				setGithub( item.github );
			}
		} )
	}, [ data ] )
	if ( !Student ) {
		return <h1>Student not found!</h1>
	}
	return (
		<div>
      <Form type="edit" data={[ data, setData ]} nama={[ nama, setNama ]} quotes={[ quotes, setQuotes ]} profile={[ profile, setProfile ]} email={[ email, setEmail ]} github={[ gitHub, setGithub ]} student={Student} handleSubmit={handleSubmit} status={status} />
		</div>
	);
}
export default Edit;
