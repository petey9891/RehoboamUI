import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/authentication/Login';
import RouteValidation from './components/authentication/RouteValidation';
import Dashboard from './components/Dashboard';

export const App = () => (
	<>
		<Router>
			<RouteValidation>
				<Route exact path="/" component={Login} />
				<Route exact path="/dashboard" component={Dashboard} />
			</RouteValidation>
		</Router>
	</>
);

export default hot(App);
