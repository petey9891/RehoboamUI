import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TileHeader from './TileHeader';

const TileContainer = styled.div.attrs({ className: 'shadow' })`
	border-radius: 15px;
`;

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const Tile = ({ title, className, children, height, toggle, value, setValue }) => (
	<TileContainer className={`${toggle && !value ? 'bg-gray-300' : 'bg-gray-50'} tile ${className}`} height={height}>
		<InnerContainer className="">
			<TileHeader title={title} toggle={toggle} value={value} setValue={setValue} />
			<ContentContainer className="">{children}</ContentContainer>
		</InnerContainer>
	</TileContainer>
);

Tile.propTypes = {
	title: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	height: PropTypes.string,
	toggle: PropTypes.bool,
	value: PropTypes.bool,
	setValue: PropTypes.func
};

export default Tile;
