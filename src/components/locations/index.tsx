import React, { Component } from 'react';
import LOCATIONS_URL from '../../constants';

import data from LOCATIONS_URL;

const continents = data.data.continents;

class Locations extends Component {
	render() {
		return (
			<ul>
				{continents.map(s => (<li>{s}</li>))}
			</ul>
		);
	}
}
export default Locations;
