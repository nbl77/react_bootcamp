import jwt from 'jsonwebtoken';
import config from './config';

const initialState = _ => {
	if ( localStorage.assignment ) {
		return jwt.verify( localStorage.assignment, config.secret_key, function ( err, decode ) {
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
	localStorage.setItem( "assignment", token );
	return true;
}
const Assign = ( state = initialState(), action ) => {
	switch ( action.type ) {
	case "addAssign":
		state = [ ...state, action.data ];
		setItem( state );
		return state;
		break;
	default:
		return state;
	}
}

export default Assign;
