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
import {
	InfoPoster
} from './../customComponent';
import {
	isLoaded,
	isEmpty,
	useFirebase
} from 'react-redux-firebase'
import {
	useSelector
} from 'react-redux';

function Confirm( {
	match
} ) {
	const firebase = useFirebase();
	const id = match.params.id;
	const auth = useSelector( state => state.firebase.auth )
	const [ movie, setMovie ] = React.useState();
	const [ seat, setSeat ] = React.useState();
	const [ schedule, setSchedule ] = React.useState();
	const [ studio, setStudio ] = React.useState();
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US`
	React.useEffect( _ => {
		if ( !movie ) {
			fetch( url )
				.then( res => res.json() )
				.then( res => setMovie( res ) )
				.catch( err => console.log( err ) )
		}
	} )
	const handleSubmit = _ => {
		const data = {
			uid: auth.uid,
			seat,
			schedule,
			studio,
			movie,
			code: Date.now(),
			price: 40000
		}
		if ( seat === undefined || schedule === undefined || studio === undefined ) {
			alert( "data tidak boleh kosong" )
		} else {
			firebase.push( "booking", data, _ => alert( "Berhasil memsan tiket, silahkan cek di menu tiket" ) );
		}
	}
	const num = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
	return (
		<div className="bg-dark">
			<MDBContainer className="payment d-flex align-items-center">
	      <MDBCard className="rounded-0 bg-dark z-depth-0 w-100" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="dollar-sign" className="color-second" /> Confirm Payment</MDBCardTitle>
	          <MDBListGroup>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex justify-content-center text-center">
	              <div>
	                <h4>{movie ? movie.title:""}</h4>
	                <img src={`https://image.tmdb.org/t/p/w500${movie ? movie.poster_path:""}`} style={{width: "200px"}} alt="img purchase"/>
	              </div>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex justify-content-between">
	              <span className="w-50 text-center">Language</span>
	              <b>{movie ? movie.original_language.toUpperCase() : ""}</b>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex align-items-center justify-content-between">
	              <span className="w-50 text-center">Seat number :</span>
								<div>
	                <select className="browser-default custom-select" onChange={e=>setSeat(e.target.value)} required>
										<option value="" selected disabled >Choose a seat</option>
										{num.map((item,index)=>{
											if (index <= 10) {
												return(<option value={`A${index}`}>A{index}</option>)
											}else if (index < 20 && index > 10) {
												return(<option value={`B${index - 10}`}>B{index - 10}</option>)
											}
											return(<option value={`C${index - 20}`}>C{index - 20}</option>)
										})}
	                </select>
	              </div>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex align-items-center justify-content-between">
	              <span className="w-50 text-center">Schedule :</span>
	              <div>
	                <select className="browser-default custom-select" onChange={e=>setSchedule(e.target.value)} required>
										<option value="" selected disabled >Choose a schedule</option>
										<option value="12:00">12:00</option>
	                  <option value="15:00">15:00</option>
	                  <option value="19:00">19:00</option>
	                </select>
	              </div>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex align-items-center justify-content-between">
	              <span className="w-50 text-center">Studio :</span>
	              <div>
	                <select className="browser-default custom-select" onChange={e=>setStudio(e.target.value)} required>
	                  <option value="" selected disabled >Choose a studio</option>
										<option value="studio 1">studio 1</option>
										<option value="studio 2">studio 2</option>
	                  <option value="studio 3">studio 3</option>
	                </select>
	              </div>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex align-items-center justify-content-between">
	              <span className="w-50 text-center">Price :</span>
	              <span>Rp. 40.000,00</span>
	            </MDBListGroupItem>
	            <MDBListGroupItem className="bg-dark text-white border-light d-flex align-items-center justify-content-center">
	              <MDBBtn className="text-center bg-orange" onClick={handleSubmit}>Pay</MDBBtn>
	            </MDBListGroupItem>
	          </MDBListGroup>
	        </MDBCardBody>
	      </MDBCard>
	    </MDBContainer>
		</div>
	)
}
export default Confirm;
