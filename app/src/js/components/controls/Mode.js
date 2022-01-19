import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';

import SocketManager from '../../managers/SocketManager';
import Tile from '../common/Tile';

import { APPLICATIONS } from '../../constants/Applications';

const CheckIcon = () => {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
			<circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
			<path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const Mode = ({ mode, setMode }) => {
	const handleSelected = (app) => {
		setMode(app);
		SocketManager.manager.setMode(app.id);
	};

	return (
		<Tile title="Mode" className="modeTile">
			<div className="w-full px-10">
				<RadioGroup value={mode} onChange={handleSelected}>
					<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
					<div className="space-y-2">
						{APPLICATIONS.map((app) => (
							<RadioGroup.Option
								key={app.name}
								value={app}
								className={({ active, checked }) =>
									`${active && mode ? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60' : ''}
							         ${checked && mode ? 'bg-blue-500 bg-opacity-75 text-white' : 'bg-white'}
							         relative rounded-lg shadow-lg px-5 py-4 cursor-pointer flex focus:outline-none`
								}
							>
								{({ checked }) => (
									<>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center">
												<div className="text-sm">
													<RadioGroup.Label
														as="p"
														className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
													>
														{app.name}
													</RadioGroup.Label>
													<RadioGroup.Description
														as="span"
														className={`inline ${checked ? 'text-light-blue-100' : 'text-gray-500'}`}
													>
														<span>{app.description}</span>
													</RadioGroup.Description>
												</div>
											</div>
											{checked && (
												<div className="flex-shrink-0 text-white">
													<CheckIcon />
												</div>
											)}
										</div>
									</>
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</Tile>
	);
};

Mode.propTypes = {
	mode: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		description: PropTypes.string
	}),
	setMode: PropTypes.func
};

export default Mode;
