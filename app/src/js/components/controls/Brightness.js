import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch } from '@headlessui/react';

import SocketManager from '../../managers/SocketManager';

import Tile from '../common/Tile';
import Slider from '../common/Slider';

const InnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Brightness = ({ position }) => {
	const [display, setDisplay] = useState(true);
	const [brightness, setBrightness] = useState(100);

	const handleDisplay = () => {
		setDisplay(!display);
		SocketManager.manager.toggleDisplay();
	};

	const handleBrightness = (value) => {
		setBrightness(value);
		SocketManager.manager.setBrightness(value);
	};

	return (
		<Tile title="Brightness" position={position}>
			<InnerContainer>
				<Switch.Group>
					<div className="flex items-center">
						<Switch
							checked={display}
							onChange={handleDisplay}
							className={`${
								display ? 'bg-blue-500 bg-opacity-75' : 'bg-gray-200'
							} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
						>
							<span
								className={`${
									display ? 'translate-x-6' : 'translate-x-1'
								} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
							/>
						</Switch>
					</div>
				</Switch.Group>
				<Slider value={brightness} setValue={handleBrightness} />
			</InnerContainer>
		</Tile>
	);
};

Brightness.propTypes = {
	position: PropTypes.string
};
export default Brightness;
