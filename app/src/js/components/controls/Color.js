import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../common/Tile';

export const Color = ({ position }) => {
	return (
		<Tile title="Color" position={position}>
			<div className="text-center">Color wheel / picker</div>
		</Tile>
	);
};

Color.propTypes = {
	position: PropTypes.string
};

export default Color;
