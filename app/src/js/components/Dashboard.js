import React, { useEffect, Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
// import { io } from 'socket.io-client';
import styled from 'styled-components';

import Color from './controls/Color';
import Power from './controls/Power';
import Brightness from './controls/Brightness';
import Mode from './controls/Mode';

const largeGridCss = 'lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-6';
const smallGridCss = 'grid-flow-row grid-cols-1 grid-rows-10';

const ControlsContainer = styled.div.attrs({
	className: `max-w-7xl mx-10 xl:mx-auto py-6 sm:px-6 lg:px-8 h-auto grid gap-4 ${smallGridCss} ${largeGridCss}`
})`
	margin-top: -8rem;
	border-radius: 15px;
`;

export const Dashboard = () => {
	// useEffect(() => {
	// 	const socket = io('127.0.0.1:8081');
	// 	socket.on('connect', () => {
	// 		console.log(socket.id);
	// 	});
	// });

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
					<Color position="sm:col-span-2 lg:col-span-1 sm:row-span-2 lg:row-span-full" />
					<Power position="sm:col-span-2 lg:col-span-1 row-span-2" />
					<Brightness position="sm:col-span-2 lg:col-span-1 row-span-2" />
					<Mode position="sm:col-span-2 lg:col-span-1 row-span-2" />
				</ControlsContainer>
			</main>
		</div>
	);
};

export default Dashboard;
