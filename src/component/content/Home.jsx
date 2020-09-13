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
	MDBLink
} from 'mdbreact';
import {
	InfoPoster
} from './../customComponent';

function Home() {
	const [ movieTrend, setMovieTrend ] = React.useState( [] );
	const [ movieNewest, setMovieNewest ] = React.useState( [] );
	let urlImg = "https://image.tmdb.org/t/p/w500";
	let img = "";
	const url = ( sort_by ) => {
		return `https://api.themoviedb.org/3/discover/movie?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=1&primary_release_year=2020&year=2020`
	}
	React.useEffect( () => {
		if ( movieTrend.length < 1 ) {
			fetch( "https://api.themoviedb.org/3/movie/top_rated?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&page=1" )
				.then( res => res.json() )
				.then( res => setMovieTrend( res.results ) )
				.catch( err => console.log( err ) )
		}
		if ( movieNewest.length < 1 ) {
			fetch( "https://api.themoviedb.org/3/movie/now_playing?api_key=e4f0ec9c76ead6beb8688268ce2908c8&language=en-US&page=1" )
				.then( res => res.json() )
				.then( res => setMovieNewest( res.results ) )
				.catch( err => console.log( err ) )
		}
	}, [ movieNewest ] )
	if ( movieTrend.length < 1 ) {
		return <></>
	}
	return (
		<div className="bg-dark">
			<MDBContainer>
	      <MDBCard className="rounded-0 bg-dark z-depth-0" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon icon="stream" className="color-second" /> Trends</MDBCardTitle>
						<MDBRow>
							{movieTrend.filter((data,index)=>index < 4).map(item=>(
								<MDBCol md="3" key={item.id}>
									<div className="position-relative poster mb-4">
										<div className="rating">
											<MDBIcon icon="star" className="color-second" />
											&nbsp;
											<span className="text-white">{item.vote_average}/10</span>
										</div>
										<MDBCardImage cascade className="img-fluid poster-3" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
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
				<MDBCard className="rounded-0 bg-dark z-depth-0" id="mainPage">
	        <MDBCardBody>
	          <MDBCardTitle tag="h5" className="text-white"><MDBIcon far icon="newspaper" className="color-second" /> Newest</MDBCardTitle>
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
export default Home;
