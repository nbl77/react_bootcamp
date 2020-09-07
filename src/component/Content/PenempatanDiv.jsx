import React from 'react';
import {
	MDBRow,
	MDBCol,
	MDBBtn
} from "mdbreact";
import {
	useSelector,
	useDispatch
} from 'react-redux';
export default function PenempatanDiv( props ) {
	const dispatch = useDispatch();
	const divisi = useSelector( state => state.divisi );
	const karyawan = useSelector( state => state.karyawan );
	const penempatan = useSelector( state => state.assignment );
	const addPenempatan = data => dispatch( {
		type: "addAssign",
		data: data
	} );
	const handleSubmit = ( e ) => {
		e.preventDefault();
		const data = {
			karyawan: e.target.karyawan.value,
			divisi: e.target.divisi.value
		}
		if ( data.karyawan === "" ) {
			alert( "Karyawan Tidak Boleh Kosong" );
		} else if ( data.divisi === "" ) {
			alert( "Divisi Tidak Boleh kosong" );
		} else {
			addPenempatan( data );
			alert( "Berhasil Menempatkan Karyawan" );
			e.target.karyawan.value = "";
			e.target.divisi.value = "";
		}
	}
	return (
		<div className='container'>
			<MDBRow>
				<MDBCol md="6" style={{margin:"0 auto"}}>
					<form onSubmit={handleSubmit} method="post">
						<label htmlFor="karyawan">Pilih Karyawan</label>
						<select className="browser-default custom-select" name='karyawan' required>
							<option value="">--Pilih Karyawan--</option>
							{karyawan.map((item,index)=>(<option value={item.id_karyawan} key={item.id_karyawan}>{item.nama}</option>))}
						</select>
						<label htmlFor="divisi">Pilih Divisi</label>
						<select className="browser-default custom-select" name='divisi' required>
							<option value="">--Pilih Divisi--</option>
							{divisi.map((item,index)=>(<option value={item.id_divisi} key={item.id_divisi}>{item.divisi}</option>))}
						</select>
						<MDBBtn type="submit">Submit</MDBBtn>
					</form>
				</MDBCol>
			</MDBRow>

		</div>
	)
}
