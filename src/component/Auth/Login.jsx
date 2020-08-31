import React, {
	useState,
  useEffect,
  useContext
} from 'react';
import {AuthContext} from '.';
import {Redirect} from 'react-router-dom';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
	MDBInput,
	MDBBtn
 } from "mdbreact";


export function LoginForm() {
	const [status,setStatus] = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const karyawan = localStorage.karyawan ? JSON.parse(localStorage.karyawan) : [];
	useEffect(()=>{
    const login = localStorage.login ? JSON.parse(localStorage.login) : false;
		if (login) {
			setEmail(login.email);
			setPassword(login.password);
			setStatus(true);
		}
	})
	const handleChange = (e) =>{
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}else if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		let type = "karyawan";
		const stt = karyawan.some(item=>(item.email === email && item.password === password))
		if (email.toLowerCase() === "hrd@email.com" && password.toLowerCase() === "hrd") {
			type = "hrd";
			const data = {
				email:email,
				password:password,
				type:type,
				id:1
			}
			setStatus(true);
			localStorage.setItem("login",JSON.stringify(data));
		}else if (stt) {
			const data = {
				email:email,
				password:password,
				type:type,
				id:karyawan.filter(item=>(item.email === email && item.password === password))[0].id_karyawan
			}
			setStatus(true);
			localStorage.setItem("login",JSON.stringify(data));
		}else {
			alert("Email atau password yang anda masukan salah");
		}
	}
	return(
		<MDBContainer style={{marginTop:"30px"}}>
			{status ? <Redirect to='/'/>: null}
			<MDBRow className="justify-content-md-center">
				<MDBCol md="5">
					<MDBCard style={{padding:"20px"}} className="shadow-box-example z-depth-2">
				    <MDBCardImage className="img-fluid" variant="top" src="img/login.svg" style={{height:"250px",margin:"0 auto"}} />
				    <MDBCardBody>
							<MDBCardTitle style={{textAlign:"center"}}>Silahkan Login Terlebih dahulu</MDBCardTitle>
				      <MDBCardText>
								<form onSubmit={handleSubmit}>
									<MDBInput label="Email address" type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} />
									<MDBInput label="Password" type="password" name="password" placeholder="Enter Password" value={password} onChange={handleChange} autoComplete='off' />
									<MDBBtn color="primary" type='submit'>Login</MDBBtn>
								</form>
				      </MDBCardText>
				    </MDBCardBody>
				  </MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}
