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
	MDBBtn
} from 'mdbreact';
import {
	InfoPoster
} from './../customComponent';
import {
	isLoaded,
	isEmpty
} from 'react-redux-firebase'
import {
	useSelector
} from 'react-redux';

function Single( {
	match
} ) {
	const id = match.params.id;
	const [ movie, setMovie ] = React.useState();
	const [ trailer, setTrailer ] = React.useState();
	let urlImg = "https://image.tmdb.org/t/p/w500";
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US`
	const auth = useSelector( state => state.firebase.auth )
	const typeLogged = useSelector( state => state.typeLogged )
	let Background = "";
	let poster = "";
	let titleMovie = "";
	let tagline = "";
	React.useEffect( _ => {
		if ( !movie ) {
			fetch( url )
				.then( res => res.json() )
				.then( res => setMovie( res ) )
				.catch( err => console.log( err ) )
		} else {
			if ( !trailer ) {
				const urlTr = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US`
				fetch( urlTr )
					.then( res => res.json() )
					.then( data => {
						if ( data.results.length < 1 ) {
							setTrailer( false );
						} else {
							setTrailer( data.results[ 0 ].key )
						}
					} );
			}
		}
	} )
	if ( movie ) {
		Background = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
		poster = movie.poster_path;
		titleMovie = movie.original_title
		tagline = movie.tagline ? movie.tagline : movie.title
	}
	return (
		<div className="bg-dark">
      <div className="singlePage d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${Background})`}}>
        <MDBCard className="d-inline-block position-relative w-25" style={{zIndex: 2,marginBottom: "-10%"}}>
          <MDBCardBody className="p-1">
            <MDBCardImage cascade className="img-fluid poster-3" src={`https://image.tmdb.org/t/p/w500${poster}`} />
          </MDBCardBody>
        </MDBCard>
      </div>
      <MDBContainer className="d-flex justify-content-between pt-3 text-white">
        <div className="w-50">
          <h4 className="titleMovie color-second w-50">{titleMovie}</h4>
          <p className="w-50">{tagline}</p>
          <span>Rating : <MDBIcon far icon="star" className="color-second" /> {movie ? movie.vote_average:""}/10</span>
          <br/>

          <div className="d-flex">
            <span>Genre :</span>
            {movie ? movie.genres.map(item=>(
              <span className="ml-3 d-inline-block" key={item.id}>
                <MDBLink to={`/list/genre/${item.id}`} className="infoTitle-3 color-second p-0">{item.name}</MDBLink>
              </span>
            )):""}
          </div>
					{typeLogged === "user" ? (
						<>
						{isEmpty(auth) ? (<h6 className="border border-danger p-1 text-danger mt-2">Anda harus login terlebih dahulu untuk membeli tiket</h6>) : (
							<MDBLink className="m-0 p-0" to={`/buy/${id}`}>
								<MDBBtn className="m-0 bg-orange"><MDBIcon icon="dollar-sign" /> Buy Ticket</MDBBtn>
							</MDBLink>
						)}
						</>
					):null}
					<br/>
					{trailer ? (
						<>
						<h4>Trailer :</h4>
						<iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</>
					):null}
        </div>
        <div className="w-50 d-flex flex-column align-items-end">
          <div className="w-50">
            <h4>Overview :</h4>
            <p>{movie ? movie.overview : ""}</p>
          </div>
        </div>
      </MDBContainer>
      <hr/>
    </div>
	)
}
export default Single;
