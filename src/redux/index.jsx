import {
	createStore,
	combineReducers
} from 'redux';
import {
	firebaseReducer
} from 'react-redux-firebase';
import firebase from 'firebase/app';

const rrfConfig = {
	userProfile: 'users'
}
const typeLogged = ( state = "", action ) => {
	switch ( action.type ) {
	case "setTypeLogged":
		return state = action.payload;
		break;
	case "logout":
		return state = "";
		break;
	default:
		return state;
	}
}
const rootReducers = combineReducers( {
	firebase: firebaseReducer,
	typeLogged,
} )
const store = createStore( rootReducers );
const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch
}
export {
	store,
	rrfProps
}
