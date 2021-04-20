import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch } from '@headlessui/react';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const TileHeader = ({ title, toggle, value, setValue }) => (
	<Container className="w-full">
		<div className="px-10 mt-4 text-2xl font-normal text-gray-400">{title}</div>
		{toggle ? (
			<div className=" pr-5 mt-4">
				<Switch
					checked={value}
					onChange={setValue}
					className={`${
						value ? 'bg-red-500 bg-opacity-75' : 'bg-gray-200'
					} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>
					<span
						className={`${
							value ? 'translate-x-6' : 'translate-x-1'
						} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
					/>
				</Switch>
			</div>
		) : null}
	</Container>
);

TileHeader.propTypes = {
	title: PropTypes.string,
	toggle: PropTypes.bool,
	value: PropTypes.bool,
	setValue: PropTypes.func
};

export default TileHeader;
