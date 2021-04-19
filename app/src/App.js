import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { io } from 'socket.io-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const App = () => {
	useEffect(() => {
		const socket = io('127.0.0.1:8081');
		socket.on('connect', () => {
			console.log(socket.id);
		});
	});

	return (
		<>
			<Router>
				<Route exact path="/" render={() => <div>Hi</div>} />
			</Router>
		</>
	);
};

export default hot(App);
