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
export default function PenempatanDiv() {
	let divisi = localStorage.divisi ? JSON.parse(localStorage.divisi) : [];
	let karyawan = localStorage.karyawan ? JSON.parse(localStorage.karyawan) : [];
	let penempatan = localStorage.penempatan ? JSON.parse(localStorage.penempatan) : [];
	const handleSubmit = (e) =>{
		e.preventDefault();
		const data = {
			karyawan:e.target.karyawan.value,
			divisi:e.target.divisi.value
		}
		if (data.karyawan === "") {
			alert("Karyawan Tidak Boleh Kosong");
		}else if (data.divisi === "") {
			alert("Divisi Tidak Boleh kosong");
		}else{
			penempatan = [...penempatan,data];
			console.log(penempatan);
			localStorage.setItem("penempatan",JSON.stringify(penempatan));
			alert("Berhasil Menempatkan Karyawan");
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
