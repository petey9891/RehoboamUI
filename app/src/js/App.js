import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';

export const App = () => (
	<>
		<Router>
			<Route exact path="/" component={Dashboard} />
		</Router>
	</>
);

export default hot(App);
