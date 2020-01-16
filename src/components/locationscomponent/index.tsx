import React, { Component } from 'react';
import LOCATIONS_URL, {PRICES_URL} from '../../constants';
import requestHandler from '../../utils/request';

const continents = '';

requestHandler(LOCATIONS_URL)
	.then(({ data, error }) => {
		if (error) {
			console.error(error);
			return;
		}

		continents = data.data.continents;
	})
	.catch(console.error);


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
