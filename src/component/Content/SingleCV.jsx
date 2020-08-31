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
export default function SingleCV({match}) {
	const id = parseInt(match.params.id);
	const penempatan = localStorage.penempatan ? JSON.parse(localStorage.penempatan).filter(item=>item.karyawan==id) : [];
	const divisi = penempatan.length > 0 ? JSON.parse(localStorage.divisi).filter(item=> item.id_divisi == parseInt(penempatan[0].divisi)) : [];
	const karyawan = JSON.parse(localStorage.karyawan).filter(item=>item.id_karyawan==id)[0];
	if (!karyawan) {
		return(
			<MDBContainer style={{textAlign:"left"}}>
				<h4>Karyawan Tidak Ditemukan</h4>
			</MDBContainer>
		)
	}
	return (
		<MDBContainer style={{textAlign:"left"}}>
			<h3>Nama Karyawan : {karyawan.nama}</h3>
			<hr/>
			<h5>Divisi :</h5>
			{divisi.length > 0 ? divisi[0].divisi: "belum ditempatkan ke divisi" }
			<hr/>
			<h5>Alamat :</h5>
			{karyawan.alamat}
		</MDBContainer>
	)
}
