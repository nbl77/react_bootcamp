import React, {
	useState
} from 'react';

import {Link} from 'react-router-dom';

export default function ListCV() {
	const karyawan = localStorage.karyawan ? JSON.parse(localStorage.karyawan) : [];
	return (
		<div className='container'>
			<ul>
        <li><h3>List Cv :</h3></li>
        {karyawan.map((kar,index)=> (
					<li key={index}>
						<Link to={`/single/${kar.id_karyawan}`}>{kar.nama}</Link>
					</li>
				))}
      </ul>
		</div>
	)
}
