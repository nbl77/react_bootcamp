import React from 'react';
import {useParams} from 'react-router';
import {
	MDBContainer
 } from "mdbreact";
export default function SingleCV(props) {
	let {id} = useParams();
	id = parseInt(id);

	let [penempatan,setPenempatan] = props.penempatan;
	penempatan = penempatan ? penempatan.filter(item=>item.karyawan===id) : [];

	let [divisi,setDivisi] = props.divisi;
	divisi = divisi.length > 0 ? divisi.filter(item=> item.id_divisi === parseInt(penempatan[0].divisi)) : [];

	let [karyawan,setKaryawan] = props.karyawan;
	karyawan = karyawan.filter(item=>item.id_karyawan===id)[0];

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
