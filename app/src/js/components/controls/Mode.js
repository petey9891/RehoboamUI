import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';

import Tile from '../common/Tile';

const modes = [
	{
		name: 'Color Pulse',
		description: 'A color pulsing good time'
	},
	{
		name: 'Rehoboam',
		description: 'The ring of terror'
	}
];

const CheckIcon = () => {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
			<circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
			<path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const Mode = ({ position }) => {
	const [selected, setSelected] = useState(modes[0]);

	return (
		<Tile title="Mode" position={position}>
			<div className="w-full px-10">
				<RadioGroup value={selected} onChange={setSelected}>
					<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
					<div className="space-y-2">
						{modes.map((mode) => (
							<RadioGroup.Option
								key={mode.name}
								value={mode}
								className={({ active, checked }) =>
									`${active ? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60' : ''}
							         ${checked ? 'bg-blue-500 bg-opacity-75 text-white' : 'bg-white'}
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
														{mode.name}
													</RadioGroup.Label>
													<RadioGroup.Description
														as="span"
														className={`inline ${checked ? 'text-light-blue-100' : 'text-gray-500'}`}
													>
														<span>{mode.description}</span>
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
	position: PropTypes.string
};

export default Mode;
