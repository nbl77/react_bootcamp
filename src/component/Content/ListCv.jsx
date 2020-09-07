import React, {
	useState
} from 'react';

import {
	Link
} from 'react-router-dom';
import {
	useSelector
} from 'react-redux';

export default function ListCV() {
	const karyawan = useSelector( state => state.karyawan );
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
