import React from 'react';
import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBCardFooter,
	MDBIcon,
	MDBRow,
	MDBCol,
	MDBCardImage,
	MDBLink,
	MDBListGroup,
	MDBListGroupItem,
	MDBInput,
	MDBBtn
} from 'mdbreact';
import QRCode from 'qrcode.react';
import {
	InfoPoster
} from './../customComponent';
import {
	isLoaded,
	isEmpty,
	useFirebase,
	useFirebaseConnect
} from 'react-redux-firebase'
import {
	useSelector
} from 'react-redux';

function Ticket() {
	useFirebaseConnect( [ {
		path: "/booking"
  } ] )
	const auth = useSelector( state => state.firebase.auth )
	const booking = useSelector( state => state.firebase.ordered.booking )
	if ( booking === undefined ) {
		return <div className="full-screen bg-dark"></div>
	}
	return (
		<div className="bg-dark full-screen">
			<MDBContainer className="payment d-flex align-items-center">
	      <MDBCard className="rounded-0 bg-dark z-depth-0 w-100" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="dollar-sign" className="color-second" /> Ticket</MDBCardTitle>
	          <MDBListGroup>
              {(booking.filter(item=>item.value.uid===auth.uid).length > 0 ) ? booking.filter(item=>item.value.uid===auth.uid).map((item,index)=>(
                <MDBListGroupItem key={index} className="bg-dark border-light text-center">
                  <MDBCard>
                    <MDBCardBody>
                      <MDBCardTitle>Judul Film : {item.value.movie.title}</MDBCardTitle>
                      <p>{item.value.movie.tagline}</p>
                      <span>Jadwal : {item.value.schedule}</span> | &nbsp;
                      <span>Kursi : {item.value.seat}</span> | &nbsp;
                      <span>Studio : {item.value.studio}</span>
                      <MDBCardText>
                        Silahkan gunakan ticket sebelum waktu dimulai
                      </MDBCardText>
                      <p>
                        <QRCode value={item.key} imageSettings={{
                          src: "./img/logo.png",
                          x: null,
                          y: null,
                          height: 24,
                          width: 24,
                          excavate: true,
                        }} />
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBListGroupItem>
              )):(<h1 className="text-white">anda belum memesan tiket</h1>)}
	          </MDBListGroup>
	        </MDBCardBody>
	      </MDBCard>
	    </MDBContainer>
		</div>
	)
}
export default Ticket;
