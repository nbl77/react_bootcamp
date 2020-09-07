import jwt from 'jsonwebtoken';
import config from './config';

const initialState = _ => {
	if ( localStorage.divisi ) {
		return jwt.verify( localStorage.divisi, config.secret_key, function ( err, decode ) {
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
	localStorage.setItem( "divisi", token );
	return true;
}
const Divisi = ( state = initialState(), action ) => {
	switch ( action.type ) {
	case "addDivisi":
		state = [ ...state, action.data ];
		setItem( state );
		return state;
		break;
	case "editDivisi":
		state = state.map( item => {
			if ( item.id_divisi === action.data.id_divisi ) {
				return action.data
			}
		} );
		setItem( state );
		return state;
	case "deleteDivisi":
		state = state.filter( item => item.id_divisi !== action.data.id_divisi );
		setItem( state );
		return state;
		break;
	default:
		return state;
	}
}

export default Divisi;
