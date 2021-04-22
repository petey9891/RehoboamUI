import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RgbColorPicker } from 'react-colorful';

import Tile from '../common/Tile';

const InnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Picker = styled.div`
	display: flex;
	padding: 12px;
	flex-wrap: wrap;
`;

const Swatch = styled.button`
	width: 24px;
	height: 24px;
	margin: 4px;
	border: none;
	padding: 0;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
`;

const ColorContainer = styled.div`
	border-radius: 8px;
`;

const ColorPicker = styled(RgbColorPicker)`
	height: 90% !important;
	width: 100% !important;
`;

const presetColors = ['#cd9323', '#1a53d8', '#9a2151', '#0d6416', '#8d2808'];

const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null;
};

export const Color = ({ position }) => {
	const [color, setColor] = useState();

	const handleColorSelect = (value) => {
		setColor(value);
	};

	return (
		<Tile title="Color" position={position}>
			<InnerContainer className="w-full h-full px-10">
				<ColorContainer className="bg-gray-100 w-full h-3/4">
					<ColorPicker color={color} onChange={handleColorSelect} />
					<Picker className="w-full">
						{presetColors.map((presetColor) => (
							<Swatch
								type="button"
								aria-label="choose"
								key={presetColor}
								className="picker__swatch"
								style={{ background: presetColor }}
								onClick={() => handleColorSelect(hexToRgb(presetColor))}
							/>
						))}
					</Picker>
				</ColorContainer>
			</InnerContainer>
		</Tile>
	);
};

Color.propTypes = {
	position: PropTypes.string
};

export default Color;
