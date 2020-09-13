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
	MDBBtn,
	MDBModal,
	MDBModalHeader,
	MDBModalBody,
	MDBModalFooter
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

function KonfigurasiBioskop() {
	useFirebaseConnect( [ {
		path: "movie"
	}, {
		path: "bioskop"
	} ] )
	const firebase = useFirebase();
	const [ type, setType ] = React.useState();
	const [ modal, setModal ] = React.useState( false );
	const [ nama, setNama ] = React.useState();
	const [ alamat, setAlamat ] = React.useState();
	const [ movie, setMovie ] = React.useState( [] );
	const rawMovie = useSelector( state => state.firebase.ordered.movie );
	const bioskop = useSelector( state => state.firebase.ordered.bioskop );
	const toggle = e => {
		const typeCur = e !== undefined ? JSON.parse( e.target.value ) : "";
		setType( typeCur );
		setModal( !modal );
		if ( typeCur !== undefined ) {
			if ( typeCur.type === "ubah" ) {
				setNama( typeCur.item.value.nama )
				setAlamat( typeCur.item.value.alamat )
			}
		}
	}
	const chng = e => {
		setMovie( [ ...e.target.selectedOptions ].map( op => JSON.parse( op.value ) ) );
	}
	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			nama,
			alamat,
			movie
		}
		firebase.push( "bioskop", data, _ => alert( "success menambahkan bioskop" ) );
		setNama( "" );
		setAlamat( "" );
		setModal( !modal );
	}
	return (
		<div className="stylish-color full-screen">
			<MDBContainer className="payment d-flex align-items-center">
	      <MDBCard className="rounded-0 elegant-color z-depth-0 w-100" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="cogs" className="color-second" /> Konfigurasi Bioskop</MDBCardTitle>
	          <MDBListGroup>
	            <MDBListGroupItem className="elegant-color text-white border-light d-flex">
                <MDBBtn onClick={toggle} value={JSON.stringify({type:"tambah"})} size="sm" className="bg-main">Tambah</MDBBtn>
	              <div className="w-75 text-center">
	                <h4>List Biokop</h4>
	              </div>
	            </MDBListGroupItem>
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
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput label="Nama Bioskop" group type="text" value={nama} onChange={e=>setNama(e.target.value)} required />
                <MDBInput label="Alamat" group type="textarea" value={alamat} onChange={e=>setAlamat(e.target.value)} required />
                <label>Select Movie</label>
                <div>
	                <select multiple className="browser-default custom-select" onChange={chng} required >
                    {rawMovie !== undefined ? rawMovie.map((item,index)=>(
                      <option key={index} value={JSON.stringify(item.value)}>{item.value.original_title}</option>
                    )):""}
	                </select>
	              </div>
              </div>
              <MDBBtn color="primary" type="submit">Simpan</MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModal>
	    </MDBContainer>
		</div>
	)
}
export default KonfigurasiBioskop;
