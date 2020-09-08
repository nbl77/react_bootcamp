const Logged = ( state = false, action ) => {
	switch ( action.type ) {
	case "LOGIN":
		return state = true;
		break;
	case "LOGOUT":
		return state = false;
		break;
	default:
		return state;
	}
}
export default Logged;
