import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

export const Login = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [verifying, setVerifying] = useState(false);
	const { push } = useHistory();

	const handleSubmit = async () => {
		if (email && password && !verifying) {
			try {
				setVerifying(true);
				await firebase.auth().signInWithEmailAndPassword(email, password);
				setVerifying(false);
				push('/dashboard');
			} catch (error) {
				setVerifying(false);
			}
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your Cube</h2>
				</div>
				<div className="mt-8 space-y-6" action="#" method="POST">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							onClick={handleSubmit}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 bg-opacity-75 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
