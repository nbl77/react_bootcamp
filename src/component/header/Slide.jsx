import React from 'react';
import {
	MDBMask,
	MDBView,
	MDBBtn
} from 'mdbreact';
import {
	Link
} from 'react-router-dom';
import {
	useFirebaseConnect,
	isLoaded,
	useFirebase,
	isEmpty
} from 'react-redux-firebase';

function Slide() {
	const firebase = useFirebase();
	return (
		<div>
      <MDBView src="./img/slide_poster.png">
        <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">
          <h2>BE THE FIRST TO KNOW!</h2>
          <p className="w-50">Experience the convenience of movie ticket booking from your desktop. Reserve all the fun and exciting entertainment!</p>
					<MDBBtn className="bg-main rounded-pill">
						<Link to="#mainPage" className="text-white">Explore</Link>
					</MDBBtn>
        </MDBMask>
      </MDBView>
    </div>
	)
}
export default Slide;
