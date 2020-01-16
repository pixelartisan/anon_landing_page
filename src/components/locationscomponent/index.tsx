import React, { Component } from 'react';
import LOCATIONS_URL from '../../constants';



fetch(LOCATIONS_URL)
.then(response => response.json())
	.then((jsonData) => {
		const continents = jsonData.data.continents;
	})
	.catch((error) => {
		// handle your errors here
		console.error(error)
	})


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
