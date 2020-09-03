import React from 'react';
import {
	MDBTable,
	MDBTableBody,
	MDBTableHead
} from 'mdbreact';
export default function ListDivis(props) {
	const [divisi,setDivisi] = props.divisi;
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
