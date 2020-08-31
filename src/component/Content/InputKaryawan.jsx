import React, {
	useState,
	useEffect
} from 'react';
import {
	Form,
	Input,
	Button,
	Select
} from './../Form';
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

export default function InputKaryawan() {
	let karyawan = [];
	if (localStorage.karyawan) {
		karyawan = JSON.parse(localStorage.karyawan);
	}
	const handleSubmit = ( e ) => {
		e.preventDefault();
		const data = {
			id_karyawan:Date.now(),
			nama_depan: e.target.first_name.value,
			nama_belakang: e.target.last_name.value,
			nama: `${e.target.first_name.value} ${e.target.last_name.value}`,
			tgl_lahir: e.target.tgl_lahir.value,
			jenis_kelamin: e.target.jenis_kelamin.value,
			email: e.target.email.value,
			password: e.target.email.value,
			alamat: e.target.alamat.value
		}
		if (data.nama === "") {
			alert("Nama Tidak Boleh Kosong");
		}else if (data.tgl_lahir === "") {
			alert("Tanggal Lahir Tidak Boleh Kosong");
		}else if (data.jenis_kelamin === "") {
			alert("Jenis Kelamin Tidak Boleh kosong");
		}else{
			karyawan = [...karyawan,data];
			localStorage.setItem("karyawan",JSON.stringify(karyawan));
			alert("Berhasil Menambahkan Karyawan");
			e.target.first_name.value = "";
			e.target.last_name.value = "";
			e.target.tgl_lahir.value = "";
			e.target.jenis_kelamin.value = "";
			e.target.email.value = "";
			e.target.alamat.value = "";
		}
	}
	return (
		<MDBContainer>
			<form onSubmit={handleSubmit}>
				<h3>Input Karyawan</h3>
				<MDBRow>
					<MDBCol md="4">
						<MDBInput type="text" name='first_name' label='Nama Depan' required/>
					</MDBCol>
					<MDBCol md="4">
						<MDBInput type="text" name='last_name' label='Nama belakang' required/>
					</MDBCol>
					<MDBCol md="4">
						<MDBInput type="email" name='email' label='Email Karyawan' required/>
					</MDBCol>
					<MDBCol md="4">
						<MDBInput type="date" name='tgl_lahir' label='Tanggal Lahir' required/>
					</MDBCol>
					<MDBCol md="4">
						<label htmlFor="">Jenis Kelamin</label>
						<select className="browser-default custom-select" name='jenis_kelamin' required>
		          <option value="">--Pilih Jenis Kelamin--</option>
		          <option value="male">Male</option>
		          <option value="female">Female</option>
		        </select>
					</MDBCol>
					<MDBCol md="4">
						<MDBInput type="textarea" name='alamat' label='Alamat' required/>
					</MDBCol>
					<br/>
					<MDBBtn color="primary" type="submit">
						Submit
					</MDBBtn>
				</MDBRow>
			</form>
		</MDBContainer>
	)
}
