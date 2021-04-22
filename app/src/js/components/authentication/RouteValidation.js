import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useState } from 'react';

const RouteValidation = ({ children }) => {
	const { push } = useHistory();
	const [didFetch, setDidFetch] = useState(false);

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in.
			push('/cube/dashboard');
			setDidFetch(true);
			return;
		}
		// No user is signed in.
		push('/');
		setDidFetch(true);
	});

	return didFetch ? children : null;
};

RouteValidation.propTypes = {
	children: PropTypes.node
};

export default RouteValidation;
