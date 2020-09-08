import app from 'firebase/app';
import 'firebase/database';

const addChild = () => {

}


const Student = ( state = [], action ) => {
	const db = app.database();
	const student = db.ref( 'students' );
	switch ( action.type ) {
	case "addStudent":
		console.log( "Menambahkan data ini :" );
		console.log( action.payload );
		state = [ ...state, action.payload ];
		student.set( state )
		return state;
		break;
	case "editStudent":
		state = action.payload;
		console.log( "Update Data" );
		console.log( state );
		student.set( state )
		return state;
		break;
	case "setStudent":
		return state = action.payload;
		break;
	default:
		return state;
	}
}

export default Student;
