import React, {
	useState
} from 'react';
import {
	MDBTable,
	MDBTableBody,
	MDBTableHead,
	MDBIcon
} from 'mdbreact';
export default function ListDivis() {
	let divisi = localStorage.divisi ? JSON.parse(localStorage.divisi) : [];
	let karyawan = localStorage.karyawan ? JSON.parse(localStorage.karyawan) : [];
	let penempatan = localStorage.penempatan ? JSON.parse(localStorage.penempatan) : [];
	return (
		<div className='container'>
			<h3>List Divisi :</h3>
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th>#</th>
						<th>ID</th>
						<th>Divisi</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{divisi.map((div,index)=> (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{div.id_divisi}</td>
							<td>{div.divisi}</td>
						</tr>
					))}
				</MDBTableBody>
			</MDBTable>
		</div>
	)
}
