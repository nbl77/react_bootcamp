import React, {
	useState
} from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
	MDBInput,
	MDBSelect,
	MDBBtn
} from "mdbreact";
import {
	useDispatch,
	useSelector
} from 'react-redux';
export default function InputDivisi( props ) {
	const dispatch = useDispatch();
	const divisi = useSelector( state => state.divisi );
	const addDivisi = data => dispatch( {
		type: "addDivisi",
		data: data
	} )
	const handleSubmit = ( e ) => {
		e.preventDefault();
		const data = {
			id_divisi: Date.now(),
			divisi: e.target.divisi.value
		}
		if ( data.divisi === "" ) {
			alert( "Divisi Tidak Boleh Kosong" );
			return;
		} else {
			addDivisi( data );
			alert( "Berhasil Menambahkan Divisi" );
			e.target.divisi.value = "";
		}
	}
	return (
		<div className='container'>
			<h3>Tambah Divisi</h3>
			<form onSubmit={handleSubmit} method="post">
				<MDBInput type='text' label='Nama Divisi' name='divisi' placeholder="Masukan Nama Divisi" required/>
				<MDBBtn color="primary" type="submit">Submit</MDBBtn>
			</form>
		</div>
	)
}
