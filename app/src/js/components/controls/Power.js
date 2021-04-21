import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tile from '../common/Tile';
import SocketManager from '../../managers/SocketManager';

const InnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PowerButton = styled.div`
	height: 100px;
	width: 100px;
	border: 0;
	border-radius: 50%;
	background-color: #d1d5db;

	&:hover {
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	}
	&:focus {
		outline: none;
	}
`;

const PowerButtonIcon = styled.div`
	position: relative;

	display: block;
	width: 100%;
	height: 100%;

	border-radius: inherit;

	&:before {
		content: '';

		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 2;

		width: 40px;
		height: 40px;
		margin: -20px 0 0 -20px;

		background: #d1d5db;
		border-radius: inherit;
	}

	&:after {
		content: '';

		position: absolute;
		left: 50%;
		top: 50%;

		width: 50px;
		height: 50px;
		margin: -25px 0 0 -25px;

		background: ${(props) => (props.isActive ? '#34d399' : '#9ca3af')};
		border-radius: inherit;
	}
`;

const PowerButtonIconArray = styled.span`
	position: absolute;
	top: 21px;
	left: 50%;
	z-index: 3;

	display: block;
	width: 20px;
	height: 20px;
	margin-left: -10px;

	background: #d1d5db;

	&:before {
		content: '';

		position: absolute;
		left: 50%;

		width: 6px;
		height: 25px;
		margin-left: -3px;

		background: ${(props) => (props.isActive ? '#34d399' : '#9ca3af')};
		border-radius: 10px;
	}
`;

export const Power = ({ position }) => {
	const [power, setPower] = useState(true);
	const [failsafe, setFailsafe] = useState(true);

	const handlePowerClick = () => {
		if (!failsafe) {
			setPower(!power);
			SocketManager.manager.shutdown();
		}
	};

	return (
		<Tile title="Power" position={position} toggle={true} value={!failsafe} setValue={() => setFailsafe(!failsafe)}>
			<InnerContainer>
				<PowerButton className={`${power ? 'shadow-inner' : 'shadow'}`} disabled={failsafe} onClick={handlePowerClick}>
					<PowerButtonIcon isActive={power}>
						<PowerButtonIconArray isActive={power} />
					</PowerButtonIcon>
				</PowerButton>
			</InnerContainer>
		</Tile>
	);
};

Power.propTypes = {
	position: PropTypes.string
};

export default Power;
