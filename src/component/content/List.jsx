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
	MDBBadge,
	MDBInput
} from 'mdbreact';
import {
	InfoPoster
} from './../customComponent';

function List( props ) {
	const [ movieNewest, setMovieNewest ] = React.useState( [] );
	const [ genre, setGenre ] = React.useState( [] );

	let urlImg = "https://image.tmdb.org/t/p/w500";
	let img = "";
	const url = ( sort_by ) => {
		return `https://api.themoviedb.org/3/discover/movie?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=1&primary_release_year=2020&year=2020`
	}
	React.useEffect( () => {
		if ( movieNewest.length < 1 ) {
			getMovie()
		}
		if ( genre.length < 1 ) {
			fetch( "https://api.themoviedb.org/3/genre/movie/list?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US" )
				.then( res => res.json() )
				.then( res => setGenre( res.genres ) )
				.catch( err => console.log( err ) )
		}
	}, [ movieNewest, genre ] )
	const changeResult = e => {
		const q = e.target.value;
		if ( q !== "" ) {
			fetch( `https://api.themoviedb.org/3/search/movie?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&query=${q}&page=1&include_adult=false` )
				.then( res => res.json() )
				.then( res => setMovieNewest( res.results ) )
				.catch( err => console.log( err ) )
		} else {
			getMovie();
		}
	}
	const getMovie = () => {
		fetch( "https://api.themoviedb.org/3/movie/now_playing?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&page=1" )
			.then( res => res.json() )
			.then( res => setMovieNewest( res.results ) )
			.catch( err => console.log( err ) )
	}
	return (
		<div className="bg-dark pt-5">
			<MDBContainer>
        <MDBCard className="rounded-0 bg-dark z-depth-0" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="stream" className="color-second" /> Kategori</MDBCardTitle>
						<MDBRow>
              {genre.length > 0 ? genre.map(item=>(
                <MDBCol md="2" className="mt-2" key={item.id}>
                  <MDBBadge pill color="dark"><MDBLink to={`/list/genre/${item.id}`}>{item.name}</MDBLink></MDBBadge>
                </MDBCol>
              )) : null}
						</MDBRow>
	        </MDBCardBody>
	      </MDBCard>
				<MDBCard className="rounded-0 bg-dark z-depth-0" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon far icon="newspaper" className="color-second" /> List</MDBCardTitle>
						<MDBInput type="text" label="search" onChange={changeResult}/>
						<MDBRow>
							{movieNewest.map(item=>(
								<MDBCol md="3" key={item.id}>
									<div className="position-relative poster mb-4">
										<div className="rating">
											<MDBIcon icon="star" className="color-second" />
											&nbsp;
											<span className="text-white">{item.vote_average}/10</span>
										</div>
										<MDBCardImage cascade className="img-fluid poster-3" src={item.poster_path ? urlImg + item.poster_path: "./img/no_poster.jpg"} />
										<InfoPoster md="3">
											<MDBLink to={`/single/${item.id}`} className="infoTitle-3 color-second p-0">{item.original_title}</MDBLink>
											<p className="pb-4">
												{item.overview.substr(0,75)}...
											</p>
										</InfoPoster>
									</div>
								</MDBCol>
							))}
						</MDBRow>
	        </MDBCardBody>
	      </MDBCard>
	    </MDBContainer>
		</div>
	)
}
export default List;
