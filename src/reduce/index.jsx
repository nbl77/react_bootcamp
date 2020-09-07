import divisi from './divisi';
import karyawan from './karyawan';
import logged from './logged';
import assignment from './assignment';
import {
	combineReducers
} from 'redux';

const Reducers = combineReducers( {
	divisi,
	karyawan,
	logged,
	assignment
} )
export default Reducers;
