import React from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';
import Home from './Home';
import Single from './Single';
import Confirm from './Confirm';
import List from './List';
import Bioskop from './Bioskop';
import KonfigurasiBioskop from './KonfigurasiBioskop';
import Ticket from './Ticket';
import Result from './Result';
import Slide from './../header/Slide';
import {
	isLoaded,
	isEmpty
} from 'react-redux-firebase'
import {
	useSelector
} from 'react-redux';
import {
	Redirect
} from 'react-router-dom';

function MainContent() {
	return (
		<section>
      <Switch>
				<Route path="/" exact>
					<Slide />
					<Home />
				</Route>
				<Route path="/home" exact>
					<Slide />
					<Home />
				</Route>
				<Route path="/single/:id" exact component={Single} />
				<Route path="/buy/:id" exact component={Confirm} />
				<Route path="/bioskop" exact component={Bioskop} />
				<Route path="/Konfigurasi/bioskop" exact component={KonfigurasiBioskop} />
				<Route path="/list" exact component={List} />
				<Route path="/ticket" exact component={Ticket} />
        <Route path="/list/:type/:query" exact component={Result} />
      </Switch>
    </section>
	)
}
export default MainContent;
