import React from 'react';
import {
	MDBTable,
	MDBTableBody,
	MDBTableHead,
	MDBIcon
} from 'mdbreact';
import {Link} from 'react-router-dom';
export default function ListKaryawan(props) {
	const [karyawan,setKaryawan] = props.karyawan;
	return (
		<div className='container'>
			<h3>List Karyawan :</h3>
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th>#</th>
						<th>ID</th>
						<th>Email</th>
						<th>Nama Lengkap</th>
						<th>Jenis Kelamin</th>
						<th>Tanggal Lahir</th>
						<th>Alamat</th>
						<th></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{karyawan.map((kar,index)=> (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{kar.id_karyawan}</td>
							<td>{kar.email}</td>
							<td>{`${kar.nama_depan} ${kar.nama_belakang}`}</td>
							<td>{kar.jenis_kelamin}</td>
							<td>{kar.tgl_lahir}</td>
							<td>{kar.alamat}</td>
							<td>
								<Link to={`/single/${kar.id_karyawan}`} className="text-primary"><MDBIcon far icon="eye" /> Lihat</Link>
							</td>
						</tr>
					))}
				</MDBTableBody>
			</MDBTable>
		</div>
	)
}
