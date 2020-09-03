import React from 'react';
import {
	MDBRow,
	MDBCol,
	MDBBtn
 } from "mdbreact";
export default function PenempatanDiv(props) {
	const [divisi,setDivisi] = props.divisi;
	const [karyawan,setKaryawan] = props.karyawan;
	const [penempatan,setPenempatan] = props.penempatan;
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
			setPenempatan([...penempatan,data]);
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
