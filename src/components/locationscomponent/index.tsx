import React, { Component } from 'react';
//import LOCATIONS_URL from '../../constants';

import data from 'https://backend.changemyip.com/datacenters/locations/';

const continents = data.data.continents;

class Contintents extends Component {
	render() {
		return (
			<ul>
				{continents.map(s => (<li>{s}</li>))}
			</ul>
		);
	}
}
export default Contintents;
