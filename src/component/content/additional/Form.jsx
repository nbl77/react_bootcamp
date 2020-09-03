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
import {
	Redirect
} from 'react-router-dom';

function Form( props ) {
	const type = props.type;
	const [ data, setData ] = props.data;
	const [ nama, setNama ] = props.nama;
	const [ quotes, setQuotes ] = props.quotes;
	const [ profile, setProfile ] = props.profile;
	const [ email, setEmail ] = props.email;
	const [ gitHub, setGithub ] = props.github;
	const handleChange = e => {
		switch ( e.target.name ) {
		case "nama":
			setNama( e.target.value );
			break;
		case "quotes":
			setQuotes( e.target.value );
			break;
		case "profile":
			setProfile( e.target.value );
			break;
		case "email":
			setEmail( e.target.value );
			break;
		case "gitHub":
			setGithub( e.target.value );
			break;
		}
	}
	return (
		<div>
      {props.status ? <Redirect to='/' /> : null}
			<h3>{type === "register" ? "Register" : "Edit"} Student</h3>
			<hr/>
			<MDBRow>
				<MDBCol md="12">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={props.handleSubmit}>
								<MDBCardTitle className="title-login">{type === "register" ? "Insert Student" : `Edit Student ${props.student.nama}`}</MDBCardTitle>
								<MDBInput label="Nama Lengkap" type="text" name="nama" value={nama} onChange={handleChange} autoComplete="off" />
								<MDBInput label="Quotes" type="textarea" name="quotes" value={quotes} onChange={handleChange} autoComplete="off" />
								<MDBInput label="Profile Picture" type="text" name="profile" value={profile} onChange={handleChange} autoComplete="off" />
								<MDBInput label="Email" type="email" name="email" value={email} onChange={handleChange} autoComplete="off" />
								<MDBInput label="Github" type="text" name="gitHub" value={gitHub} onChange={handleChange} autoComplete="off" />
								<MDBBtn type="submit" className="btn-yellow">
									{type === "register" ? "Register" : `Edit`}
								</MDBBtn>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</div>
	);
}
export default Form;
