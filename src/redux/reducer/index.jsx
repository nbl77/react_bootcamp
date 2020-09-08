import React from 'react';
import {
	combineReducers
} from 'redux';
import Logged from './logged';
import Student from './student';
import Firebase from './../../firebase'
Firebase();
const reducers = combineReducers( {
	Logged,
	Student
} )

export default reducers;
