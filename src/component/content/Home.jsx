import React, {
	useState
} from 'react';
import {
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardImage,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBBtn,
	MDBIcon,
	MDBLink,
	MDBModal,
	MDBModalHeader,
	MDBModalBody,
	MDBModalFooter
} from 'mdbreact';

function Home( props ) {
	const [ data, setData ] = props.data;
	const [ isOpen, setIsOpen ] = useState( false );
	const toggleModal = _ => {
		setIsOpen( !isOpen );
	}
	const userLogin = props.data[ 0 ].filter( item => item.status === "login" );
	const validation = ( id, event ) => {
		if ( data.filter( item => item.status === "login" )
			.length > 0 ) {
			if ( data.some( item => parseInt( item.id ) === parseInt( id ) && item.status !== "login" ) ) {
				event.preventDefault();
			}
		}
	}
	return (
		<div className="mb-5">
			<div className="d-flex justify-content-between">
				<h3>Data Student</h3>
				<MDBBtn className="btn-yellow" onClick={toggleModal}>Edit</MDBBtn>
			</div>
			<hr/>
			{userLogin.length > 0 ? <h4><b>Selamat Datang "{userLogin[0].nama}"</b></h4> : ""}
			<MDBRow>
				{data.length < 1 ? <MDBCol md="12"><h1>No students</h1></MDBCol> : data.map((item, i)=>(
					<MDBCol md="3" key={i}>
						<MDBCard style={{minHeight:"550px",maxHeight:"550px"}}>
							<MDBCardImage src={item.profile} width="100%" className="img-fluid" alt={item.nama} />
							<MDBCardBody className="d-flex flex-column justify-content-around">
								<MDBCardTitle>{item.nama}</MDBCardTitle>
								<MDBCardText>
									{item.quotes}
								</MDBCardText>
								<MDBCol md="12" className="d-flex justify-content-center">
									<MDBLink to="javascript:void(0)" onClick={(e)=>{e.preventDefault();window.open(item.github)}} target="_blank" style={{boxShadow:"none",padding:"0px",fontSize:"30px",color:"#000"}}>
										<MDBIcon size="lg" fab icon="github" /> <span style={{fontSize:"18px"}}>GitHub</span>
									</MDBLink>
								</MDBCol>
							</MDBCardBody>
						</MDBCard>

					</MDBCol>
				))}
			</MDBRow>
      <MDBModal isOpen={isOpen} toggle={toggleModal} size="lg">
        <MDBModalHeader toggle={toggleModal}>Edit Student</MDBModalHeader>
        <MDBModalBody>
					<MDBRow>
						{data.length < 1 ? <MDBCol md="12"><h1>No students</h1></MDBCol> : data.map((item, i)=>(
							<MDBCol md="4" key={i}>
								<MDBLink to={`/edit/${item.id}`} onClick={(e)=>{validation(item.id,e)}}>
									<MDBCard style={{minHeight:"480px",maxHeight:"480px"}}>
										<MDBCardImage src={item.profile} width="100%" className="img-fluid" alt={item.nama} />
										<MDBCardBody className="d-flex flex-column justify-content-around">
											<MDBCardTitle>{item.nama}</MDBCardTitle>
											<MDBCardText>
												{item.quotes}
											</MDBCardText>
											<MDBCol md="12" className="d-flex justify-content-center">
												<MDBLink to="javascript:void(0)" onClick={(e)=>{e.preventDefault();window.open(item.github)}} target="_blank" style={{boxShadow:"none",padding:"0px",fontSize:"30px",color:"#000"}}>
													<MDBIcon size="lg" fab icon="github" /> <span style={{fontSize:"18px"}}>GitHub</span>
												</MDBLink>
											</MDBCol>
										</MDBCardBody>
									</MDBCard>
								</MDBLink>
							</MDBCol>
						))}
					</MDBRow>
        </MDBModalBody>
      </MDBModal>
		</div>
	);
}
export default Home;
