import React from 'react';
import Header from './component/header';
import Content from './component/content';

import {
	Login,
	Register,
	Logout
} from './component/auth';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

function App() {
	return (
		<div>
	    <Router>
				<Header />
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/logout" exact component={Logout} />
					<Route path="/">
						<Content />
					</Route>
				</Switch>
	    </Router>
		</div>
	)
}
export default App;
