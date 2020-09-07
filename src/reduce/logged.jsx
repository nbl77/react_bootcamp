import jwt from 'jsonwebtoken';
import config from './config';

const initialState = _ => {
	if ( localStorage.logged ) {
		return jwt.verify( localStorage.logged, config.secret_key, function ( err, decode ) {
			if ( err ) {
				console.log( err );
				return {
					status: false
				};
			} else {
				return decode.data;
			}
		} )
	}
	return {
		status: false
	};
}
const setItem = data => {
	data = {
		data
	};
	const token = jwt.sign( data, config.secret_key, {
		expiresIn: 60 * 60 * 24
	} );
	localStorage.setItem( "logged", token );
	return true;
}
const Logged = ( state = initialState(), action ) => {
	switch ( action.type ) {
	case "SIGN":
		state = action.data;
		setItem( state );
		return state;
		break;
	default:
		return state;
	}
}

export default Logged;
