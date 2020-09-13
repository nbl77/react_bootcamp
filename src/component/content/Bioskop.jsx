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
	MDBBtn,
	MDBCardImage,
	MDBLink,
	MDBBadge,
	MDBListGroup,
	MDBListGroupItem
} from 'mdbreact';
import {
	InfoPoster
} from './../customComponent';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import {
	useFirebaseConnect,
	useFirebase
} from 'react-redux-firebase';

function Bioskop( props ) {
	useFirebaseConnect( [ {
		path: "bioskop"
	} ] )
	const type = useSelector( state => state.typeLogged )
	const bioskop = useSelector( state => state.firebase.ordered.bioskop );
	return (
		<div className="bg-dark full-screen pt-5">
			<MDBContainer>
				<MDBCard className="rounded-0 elegant-color z-depth-0 w-100" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="bars" className="color-second"/> List Bioskop</MDBCardTitle>
						{type === "admin" ? (
							<MDBBtn size="sm" className="bg-main p-0 "><MDBLink to="/Konfigurasi/bioskop" className="text-white">Konfigurasi Bioskop</MDBLink></MDBBtn>
						):null}
	          <MDBListGroup>
              <MDBListGroupItem className="elegant-color border-light">
                <MDBRow>
                  {bioskop ? bioskop.map((item,index)=>(
                    <MDBCol md="4" key={index}>
                      <MDBCard>
                        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                        <MDBCardBody>
                          <MDBCardTitle>{item.value.nama}</MDBCardTitle>
                          <MDBCardText>
                            List Movie :
                            <ul>
                              {item.value.movie.filter((a,b)=>b < 5).map((mv,i)=>(
                                <li key={i}>{mv.title}</li>
                              ))}
                              <li>.....</li>
                            </ul>
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  )):null}
                </MDBRow>
	            </MDBListGroupItem>

	          </MDBListGroup>
	        </MDBCardBody>
	      </MDBCard>
	    </MDBContainer>
		</div>
	)
}
export default Bioskop;
