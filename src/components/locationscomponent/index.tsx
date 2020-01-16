import React, { Component } from 'react';
import requestHandler from '../../utils/request';
import {LOCATIONS_URL, PRICES_URL} from '../../constants';

const continents = '';

const { contintentsList } = this.props;

requestHandler(LOCATIONS_URL)
	.then(({ data, error }) => {
		if (error) {
			console.error(error);
			return;
		}

		contintentsList(data);
	})
	.catch(console.error);



class Contintents extends Component {
	render() {
		return (
			<ul>
				{contintentsList.map(s => (<li>{s}</li>))}
			</ul>
		);
	}
}
export default Contintents;
