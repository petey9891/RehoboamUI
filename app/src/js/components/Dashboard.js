import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';

import SocketManager from '../managers/SocketManager';

import Color from './controls/Color';
import Power from './controls/Power';
import Brightness from './controls/Brightness';
import Mode from './controls/Mode';

const ControlsContainer = styled.div.attrs({
	className: `max-w-7xl mx-10 xl:mx-auto py-6 sm:px-6 lg:px-8 h-auto tileContent`
})`
	display: grid;
	grid-gap: 1rem;
	margin-top: -8rem;
	border-radius: 15px;
`;

export const Dashboard = () => {
	const [mode, setMode] = useState(null);

	useEffect(() => {
		SocketManager.manager.initialize();

		return () => {
			SocketManager.manager.end();
		};
	});

	const handleSignout = async () => {
		try {
			await firebase.auth().signOut();
		} catch (error) {
			// do nothing
		}
	};

	return (
		<div>
			<Disclosure as="nav" className="bg-gray-900">
				<div className="max-w-7xl mx-10 xl:mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<img
									className="h-8 w-8"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
									alt="Workflow"
								/>
							</div>
						</div>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								<button
									type="button"
									onClick={handleSignout}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Sign out
								</button>
							</div>
						</div>
					</div>
				</div>
			</Disclosure>
			<header className="bg-gray-900">
				<div className="max-w-7xl mx-10 xl:mx-auto pt-4 pb-40 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-white">Cube Controls</h1>
				</div>
			</header>
			<main>
				<ControlsContainer>
					<Color setMode={setMode} />
					<Power />
					<Brightness />
					<Mode mode={mode} setMode={setMode} />
				</ControlsContainer>
			</main>
		</div>
	);
};

export default Dashboard;
