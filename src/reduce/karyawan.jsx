import jwt from 'jsonwebtoken';
import config from './config';

const initialState = _ => {
	if ( localStorage.karyawan ) {
		return jwt.verify( localStorage.karyawan, config.secret_key, function ( err, decode ) {
			if ( err ) {
				console.log( err );
				return [];
			} else {
				return decode.data;
			}
		} )
	}
	return [];
}
const setItem = data => {
	data = {
		data
	};
	const token = jwt.sign( data, config.secret_key, {
		expiresIn: 60 * 60 * 24
	} );
	localStorage.setItem( "karyawan", token );
	return true;
}
const Karyawan = ( state = initialState(), action ) => {
	switch ( action.type ) {
	case "addKaryawan":
		state = [ ...state, action.data ];
		setItem( state );
		return state;
		break;
	case "editKaryawan":
		state = state.map( item => {
			if ( item.id_karyawan === action.data.id_karyawan ) {
				return action.data
			}
		} );
		setItem( state )
		return state;
	case "deleteKaryawan":
		state = state.filter( item => item.id_karyawan !== action.data.id_karyawan );
		setItem( state )
		return state;
		break;
	default:
		return state;
	}
}

export default Karyawan;
