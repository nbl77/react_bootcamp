import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';




export default function Firebase() {
	if ( !app.apps.length ) {
		app.initializeApp( config );
	}
	const auth = app.auth();
	return {
		"register": function ( obj ) {
			auth.createUserWithEmailAndPassword( obj.email, obj.password )
		},
		"getStudent":function() {
			return app.database().ref("students");
		}
	}
}
